import Service from 'miot/Service';
import Device from 'miot/device/BasicDevice';
// 设备未分配房间时原生返回伪造的房间 id，不能当真实房间 id 发给服务端
const UNASSIGNED_ROOM_ID = 'mijia.roomid.default';
// 按 did 去重在途的建记录请求：N 个按键的写入可能同时进来，init 是全量数组，
// 并发发两次会互相覆盖
const inflightInit = {};
function fetchMembers(did) {
  return Service.callSmartHomeAPI('/device/deviceinfo', { get_sub_relation: true, dids: [did] })
    .then((res) => res?.list?.[0]?.member_ship || {});
}
function fetchDeviceRoom(did) {
  return Device.getRoomInfoForCurrentHome(did).then((res) => {
    const { roomId, homeId } = res?.data || {};
    return {
      room_id: !roomId || roomId === UNASSIGNED_ROOM_ID ? 0 : roomId,
      home_id: homeId || 0,
    };
  }).catch(() => ({ room_id: 0, home_id: 0 }));
}
// 建记录的字段口径对齐宿主 PowerMultikeyActivity.initWithTemplate()：
// id/ai_desc 只能来自模板（SDK 编不出来），房间取设备自身房间，名字空则留空交给显示层回落
function buildInitMembers(did) {
  return Promise.all([
    Service.callSmartHomeAPI('/v2/device/multi_button_template', { model: Device.model, did }),
    fetchDeviceRoom(did),
  ]).then(([template, room]) => {
    const members = template?.members;
    if (!members || !members.length) {
      return null;
    }
    return members.map((m) => ({
      id: m.id,
      name: '',
      ai_desc: m.ai_desc || '',
      icon: m.icon || '',
      subclass_id: m.subclass_id || 0,
      ...room,
    }));
  });
}
// 建记录只建、不带用户的改动：init 是全量数组，去重后多个按键的写入会共用同一个
// in-flight 请求，把各自的 patch 并进来会互相丢失。统一建完再各走一次 update。
function initMembers(did) {
  if (inflightInit[did]) {
    return inflightInit[did];
  }
  const request = buildInitMembers(did).then((members) => {
    if (!members) {
      return null;
    }
    return Service.callSmartHomeAPI('/v2/device/init_membership', { did, members })
      .then(() => members.reduce((acc, m) => {
        acc[`${ m.id }`] = m;
        return acc;
      }, {}));
  });
  inflightInit[did] = request;
  const clear = () => {
    if (inflightInit[did] === request) {
      delete inflightInit[did];
    }
  };
  return request.then((res) => {
    clear();
    return res;
  }, (err) => {
    clear();
    throw err;
  });
}
/**
 * 写一条按键信息（member_ship）
 *
 * member_ship 是稀疏的：用户没配过的按键服务端没有对应记录，而
 * /v2/device/update_membership 只能改已有记录，对不存在的 member 返回
 * `code: -4 update member failed`。所以这里先补建再写 —— 与宿主
 * PowerMultikeyActivity 的 initWithTemplate() 同一套流程，SDK 侧之前漏了这一步。
 *
 * 提交的是整条 field（而不是只提交 patch）：服务端是否字段级 merge 没有依据，
 * 宿主 PowerMultikeyBean.toJson() 和插件侧 setProps 一直都是发全量。
 *
 * 基底一律现取服务端，不用调用方 state 里的那份：useSwitchInfoWithIcon 会把
 * member.icon 覆盖成解析后的图片 URL，插件侧缓存还会掺入 roomName/onIcon 等
 * 本地派生字段，拿它当基底会把这些值回写上去。
 *
 * @param {object} params
 * @param {string} params.did 母设备 did
 * @param {number} params.memberId 从 0 开始的按键下标
 * @param {object} params.patch 要改的字段
 * @returns {Promise<object>} 写成功后这条按键的完整记录
 */
export default function saveSwitchMember({ did, memberId, patch }) {
  const id = memberId + 1;
  const key = `${ id }`;
  return fetchMembers(did).then((members) => members[key] || initMembers(did).then((created) => {
    if (!created || !created[key]) {
      throw new Error('switch member init failed');
    }
    return created[key];
  })).then((serverMember) => {
    const field = { ...serverMember, ...patch, id };
    return Service.callSmartHomeAPI('/v2/device/update_membership', {
      did,
      update_fields: [{ id, field }],
    }).then(() => field);
  });
}