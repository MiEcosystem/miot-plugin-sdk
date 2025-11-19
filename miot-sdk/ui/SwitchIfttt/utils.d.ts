export function getSwitchTypeTitle(type?: string): string;
export function getSwitchTypeDescription(type?: string): string;
export function isSpecProp(prop: any): boolean;
/**
 * 需要和服务端保持一致
 * @param prop
 * @returns {string}
 */
export function encodeProp(prop: any): string;
/**
 * 需要和服务端保持一致
 * @returns { { siid, piid, aiid, eiid } |null}
 * @param key
 */
export function decodeProp(key: any): {
    siid;
    piid;
    aiid;
    eiid;
} | null;
/**
 * @description
 * @author guhao
 * @date 11/09/2023
 * @export
 * @param {object} spec
 * @returns {string} siid.piid siid.eiid siid.aiid
 */
export function encodeSpec(spec: object): string;
export function existSpecificTriggerSceneV2(scenes: any, specificTriggers: any): boolean;
export function findSpecificTriggerScene(scene: any, specificTriggers: any): any;
export function existSpecificTriggerScene(scenes: any, specificTriggers: any): boolean;
export function createSwitchScene(extra: any): any;
export function createSwitchTrigger(spec: any, propSpec: any, propValue: any, value_type?: number): {
    express: number;
    triggers: {
        id: number;
        order: number;
        src: string;
        key: string;
        extra: string;
        name: string;
        value: string;
        value_type: number;
        extra_json: {
            device_name: string;
            did: string;
            model: string;
        };
        value_json: string | {
            sub_props: {
                express: number;
                attr: {
                    key: string;
                    value: any;
                    value_type: number;
                }[];
            };
        };
        sc_id: number;
        from: number;
    }[];
};
export function createManualSceneAction(scene: any): {
    mode: number;
    actions: {
        order: number;
        type: number;
        name: any;
        payload_json: {
            enable: boolean;
            scene_id: any;
            delay_time: number;
        };
    }[];
};
export function createDeviceSceneAction(action: any): {
    mode: number;
    actions: any[];
};
export function getClickTriggerConfig(spec: any, propSpec: any, value: any): ({
    key: string;
    valueKey: string;
    value: any;
} | {
    key: string;
    valueKey?: undefined;
    value?: undefined;
})[];
export function getTargetDeviceList(homeDeviceList: any, deviceTypes: any, filterMain: any): any[];
export function getTargetSectionDeviceList(deviceList: any): {
    title: any;
    roomId: any;
    data: any[];
}[];
export function getCustomSceneName(sceneName: any): any;
export function getLocalI18n(key: any, replaces: any): any;
export function getSwitchTypeKey(spec: any): string;
export function getSwitchTypeDeviceSettingKey(spec: any): string;
export function getSwitchTypeBySceneAction(sceneAction: any): string;
export function getSceneTriggerListParam(spec: any, propSpec: any, value: any): {
    did: string;
    key: string;
    valueType: number;
    value_json: string | {
        sub_props: {
            express: number;
            attr: {
                key: string;
                value: any;
                value_type: number;
            }[];
        };
    };
    triggerKey: string;
};