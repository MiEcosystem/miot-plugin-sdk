/**
 * 所有 MIOTRPC 的名字
 */
export default MIOTRPC=>({

    /**
     * 获取固件的版本（蓝牙设备）
     * @param model 
     * @param callback {version, url, changeLog, md5?}
     * 
     */
    getLastVersionOfModel(model, callback){
        MIOTRPC.standardCall("/home/latest_version", {model}, callback)
        // public void getFirmwareUpdateInfoCommon(String model, Callback<FirmwareUpdateInfo> callback) 
    },
    /**
     * 检查设备的固件版本信息
     * @param did  deviceID
     * @param pid 可以为0
     * @param callback {updating, isLatest, description, 
     *          force->isForce,
     *          curr->curVersion, 
     *          latest->newVersion,
     *          hasNewFirmware:updating?false:!isLatest}
     */
    checkVersionOfDevice(did, pid, callback){
        ///home/checkversion {"pid":0, "did":did} 获取最新固件版本（WiFi设备）
        MIOTRPC.standardCall("/home/checkversion", {did, pid}, callback)
        //getUpdateInfo(String model, String did, int pid, final Callback<DeviceUpdateInfo> callback) { 
    },
    getUserDeviceDataWithinTime(){
        ///user/get_user_device_data 读取与时间相关数据
        /*
            {
            "did":"123",   //设备 id
            "uid":'123',   //要查询的用户 uid 
            "key":"power", //与上报时一致
            "type":"prop", //与上报时一致，属性 为 prop ，事件为 event
            "time_start":"1473841870", //数据起点时间，单位为秒
            "time_end":"1473841880", //数据终点时间，单位为为秒
            "group": //返回数据的方式，默认 raw , 可选值为 hour、day、week、 month。
            "limit": //返回数据的条数，默认 20，最大 1000
            }
        */
    },
    setUserDeviceData(){
        ///user/set_user_device_data 扩展程序上报设备数据（属性与事件）至米家云端
        /**
         * {
  "0": {
    "uid": "xxx", //用户 uid
    "did": "123", //设备id
    "time": "1473841870", //时间戳，单位为秒
    "type": "prop", // 属性为 prop，事件为 event
    "key": "power",
    "value": {} 
  },
  "1": {
    "uid": "xxx",
    "did": "456",
    "time": "1473841888",
    "type": "prop",
    "key": "power",
    "value": {}
  }
}
         */
    },
    getDeviceData(){
        ///device/batchdevicedatas
        /*
            {
            "0":{
                "did":"311223", //设备 id
                "props":["prop.usb_on","prop.on"]
            },
            "1":{
                "did":"311304",
                "props":["prop.usb_on","prop.on"]
            }
            }

             * @param jsonArray [{"did":"aaa", "props":["prop.aaa","prop.bbb"]},
             * {"did":"123", "props":["prop.jjjj","prop.777"]}]
    
        */
       
    },
    getSetting(){
        ///device/getsetting 获取数据
        /*
        {
        "did":xxx,
        "settings":["keyid_xxx_data"]
        }
        */
    },
    setSetting(){
        ///device/setsetting 设置数据
        /*
        {
        "did":xxx,
        "settings":{
            "keyid_xxx_data": "value1"
        }
        }
        */
    },

    /**
     * ApiLevel:1 获取子设备
     * 
     * @param model
     * @param didList
     * @param callback
     */
    getSubDevice(model,  didList, callback) {
        /**
         * 这使得本函数只能在原生调用
        WifiManager wifi = (WifiManager) context().getSystemService(Context.WIFI_SERVICE);
        WifiInfo info = wifi.getConnectionInfo();
        String bssid = info != null ? info.getBSSID() : null;
        if (!TextUtils.isEmpty(bssid)) {
            dataObj.put("uid", bssid.toUpperCase());
        }
         */
        const uid = "";
        MIOTRPC.standardCall("/home/sub_device_list", {dids:didList, uid}, callback)
            /*
     result is: [
    {"uid":103434651,"did":"lumi.158d00005e90f8","mac":"","pd_id":42,"city_id":101010200,
        "bssid":"","token":"","access_type":3,"localip":"","name":"门窗传感器","ssid":"",
        "longitude":116.330283,"latitude":40.028534,"parent_id":"88292"},
    {"uid":103434651,"did":"lumi.158d00005e9267","mac":"","pd_id":41,"city_id":0,
        "bssid":"","token":"","access_type":3,"localip":"","name":"无线开关","ssid":"",
        "longitude":0,"latitude":0,"parent_id":"88292"}] 
    
       result.did = object.optString("did");
       result.model = object.optString("model");
       result.name = object.optString("name");
       result.bindFlag = object.optInt("adminFlag");
       result.authFlag = object.optInt("shareFlag");
       result.ip = object.optString("localip");
       result.mac = object.optString("mac");
       result.parentModel = object.optString("parent_model");
       result.parentId = object.optString("parent_id");
       // // 对于子设备，一律认为在线
       // if (!TextUtils.isEmpty(result.parentId)) {
       // result.isOnline = true;
       // } else {
       // result.isOnline = object.optBoolean("isOnline");
       // }
       result.isOnline = object.optBoolean("isOnline"); 
*/
},

/**
 * 获取虚拟设备
 * @param model 
 * @param did 
 * @param callback {members:[deviceID,...]}
 *  
 *   
 */
getVirtualDevicesByDid(model, did, callback) {
    // MIOTRPC.standardCall("/home/virtualdevicectr", 
    //     {type:"get", masterDid:did}, callback)
},
/*
         
        callSmartHomeApi(model, "/home/virtualdevicectr", dataObj, callback,
        new Parser<List<DeviceStat>>() {
        @Override

        public List<DeviceStat> parse(String result) throws JSONException {
        JSONObject jsonObject = new JSONObject(result);
        ArrayList<DeviceStat> deviceStatArrayList = new ArrayList<DeviceStat>();
        JSONArray membersJson = jsonObject.optJSONArray("members");
        if (membersJson != null && membersJson.length() > 0) {
        for (int i = 0; i < membersJson.length(); i++) {
        deviceStatArrayList.add(getDeviceByDid(membersJson.optString(i)));
        }
        }
        return deviceStatArrayList;
        }
        });

        */
    },

    /**
     * 
         callSmartHomeApi(model, "/user/get_third_user_config", dataObj, callback,
                new Parser<Map<String, Object>>() {
                    @Override
                    public Map<String, Object> parse(String result) throws JSONException {
                        JSONObject response = new JSONObject(result);
                        Map<String, Object> map = new HashMap<>();
                        JSONArray resultObj = response.optJSONArray("result");
                        for (int i = 0; i < resultObj.length(); i++) {
                            JSONObject jsonObject = resultObj.getJSONObject(i);
                            Object key = jsonObject.get("key");
                            if (key.equals(JSONObject.NULL)) continue;
                            map.put((String) key, jsonObject);
                        }
                        return map;
                    }
                });
     */
    setUserConfigV2(  xmPluginPackage,   model,   app_id,   key,
          data,   callback) {
              /*
        if (app_id == 0 || app_id == 1) {
        if (callback != null) {
        callback.onFailure(-1, "App id invalid, value 0 and 1 are reserved.");
        }
        return;
        }
        JSONObject dataObj = new JSONObject();
        try {
        dataObj.put("component_id", app_id);
        dataObj.put("key", key);
        JSONObject attris = new JSONObject();
        Set<Map.Entry<String, Object>> entrys = data.entrySet();
        for (Map.Entry<String, Object> entry : entrys) {
        attris.put(entry.getKey(), entry.getValue());
        }
        dataObj.put("data", attris);

        } catch (JSONException e) {
        if (callback != null) {
        callback.onFailure(-1, e.toString());
        }
        return;
        }
        callSmartHomeApi(model, "/user/set_user_config", dataObj, callback, new Parser<Boolean>() {
        @Override
        public Boolean parse(String result) throws JSONException {
        JSONObject response = new JSONObject(result);
        int res = response.optInt("result");
        return res != 0;
        }
        });
        */
    },
    reportBluetoothRecords(did,  records, callback) {
        /*
        JSONObject dataObj = new JSONObject();
        try {
            dataObj.put("did", did);
            JSONArray datas = new JSONArray();

            if (!ListUtils.isEmpty(records)) {
                for (XmBluetoothRecord record : records) {
                    JSONObject jsonObj = record.toJson();
                    datas.put(jsonObj);
                }
            }

            dataObj.put("datas", datas);
        } catch (Exception e) {

            if (callback != null)
                callback.onFailure(-1, e.toString());

            return;
        }

        callSmartHomeApi(model, "/device/event", dataObj, callback,
                new Parser<List<Boolean>>() {
                    @Override
                    public List<Boolean> parse(String result) throws JSONException {
                        BluetoothLog.w("reportBluetoothRecords: " + result);

                        List<Boolean> list = new ArrayList<Boolean>();

                        if (!TextUtils.isEmpty(result)) {

                            try {
                                JSONObject jsonObj = new JSONObject(result);

                                if ("0".equals(jsonObj.optString("code"))) {
                                    JSONArray jsonArr = jsonObj.optJSONArray("result");
                                    int len = (jsonArr != null ? jsonArr.length() : 0);
                                    for (int i = 0; i < len; i++) {
                                        list.add(jsonArr.optBoolean(i));
                                    }
                                }

                            } catch (Exception e) {

                            }
                        }

                        return list;
                    }
                });
                */
    }
    //FDS
    //https://github.com/MiEcosystem/ios-rn-sdk/blob/master/MiHomePluginSDK/docs/MIOT%20FDS功能指南-微服务.pdf
})