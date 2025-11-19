/**
 * @export
 * @author Geeook
 * @since 10004
 * @module MoreSetting
 * @description 二级菜单页面——更多设置
 * @property {array} secondOptions - 二级菜单列表项的keys，keys的顺序代表显示的顺序，不传将显示全部，传空数组将显示必选项
 */
export default class MoreSetting extends React.Component<any, any, any> {
    static navigationOptions: ({ navigation }: {
        navigation: any;
    }) => {
        header: JSX.Element;
    };
    constructor(props: any, context: any);
    getMoreSetting(state: any): {
        [x: string]: {
            title: string;
            value: string;
            hideArrow: boolean;
            onPress?: undefined;
            hide?: undefined;
        } | {
            title: string;
            onPress: any;
            hide: boolean;
            value?: undefined;
            hideArrow?: undefined;
        } | {
            title: string;
            onPress: any;
            value?: undefined;
            hideArrow?: undefined;
            hide?: undefined;
        } | {
            title: string;
            value: any;
            onPress: () => any;
            hideArrow?: undefined;
            hide?: undefined;
        };
    };
    secondOptions: any;
    excludeRequiredOptions: any;
    extraOptions: any;
    moreSetting: {
        [x: string]: {
            title: string;
            value: string;
            hideArrow: boolean;
            onPress?: undefined;
            hide?: undefined;
        } | {
            title: string;
            onPress: any;
            hide: boolean;
            value?: undefined;
            hideArrow?: undefined;
        } | {
            title: string;
            onPress: any;
            value?: undefined;
            hideArrow?: undefined;
            hide?: undefined;
        } | {
            title: string;
            value: any;
            onPress: () => any;
            hideArrow?: undefined;
            hide?: undefined;
        };
    };
    privacyAndProtocolReview(): void;
    _deviceTimeZoneChangedListener: any;
    getDeviceTimeZone(): void;
    fetchHighTextContrastState(): void;
    renderPrivacyDialog({ isHighTextContrastEnabled }: {
        isHighTextContrastEnabled: any;
    }): JSX.Element;
    onDismiss(): void;
}
import React from "react";