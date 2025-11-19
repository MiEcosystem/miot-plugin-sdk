/**
 * @export
 * @author Geeook
 * @since 10004
 * @module FirmwareUpgrade
 * @description 二级菜单页面——固件升级
 * @property {array} secondOptions - 二级菜单列表项的keys，keys的顺序代表显示的顺序，不传将显示全部，传空数组将显示必选项
 */
export default class FirmwareUpgrade extends React.Component<any, any, any> {
    static navigationOptions: ({ navigation }: {
        navigation: any;
    }) => {
        header: JSX.Element;
    };
    constructor(props: any, context: any);
    firmwareSetting: {
        [x: string]: {
            type: string;
            title: string;
            value: boolean;
            onValueChange: () => void;
            onPress?: undefined;
        } | {
            type: string;
            title: string;
            onPress: () => any;
            value?: undefined;
            onValueChange?: undefined;
        };
    };
    secondOptions: any;
    renderList(items: any): any;
}
import React from "react";