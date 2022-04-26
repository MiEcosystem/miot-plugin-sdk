/**
 * @export public
 * @doc_name 手机音量模块
 * @doc_index 13
 * @doc_directory system
 * @module miot/system
 * @description
 * 手机音量
 * @example
 * import {System} from "miot"
 * import {VolumeChangeEvent} from "miot"
 * ...
 * System.volume.startVolume().then((res) => {
        alert(`getStartVolume: ${ JSON.stringify(res) }`);
    });
 System.volume.stopVolume().then(() => {})
 */
export { default, VolumeChangeEvent } from 'mhrn/system/volume';