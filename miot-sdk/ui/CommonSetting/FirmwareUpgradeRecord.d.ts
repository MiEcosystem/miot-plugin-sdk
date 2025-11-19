/**
 * @export
 * @author xiaoyu
 * @since 10043
 * @module FirmwareUpgradeAuto
 * @description 三级菜单页面——固件升级历史版本页面(该页面未使用)
 */
export default class FirmwareUpgradeRecord extends React.Component<any, any, any> {
    static navigationOptions: ({ navigation }: {
        navigation: any;
    }) => {
        header: JSX.Element;
    };
    constructor(props: any, context: any);
    accessible: any;
    backListener: any;
    refresh(): void;
    fetchDeviceUpgradeRecords(): void;
    renderItem: ({ item }: {
        item: any;
    }) => JSX.Element;
}
import React from "react";