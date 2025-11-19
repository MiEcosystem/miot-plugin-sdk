export default class CommonSettingPage extends React.Component<any, any, any> {
    static propTypes: {
        navigation: PropTypes.Validator<object>;
        commonSetting: {
            firstOptions: PropTypes.Requireable<any[]>;
            secondOptions: PropTypes.Requireable<any[]>;
            showDot: PropTypes.Requireable<any[]>;
            extraOptions: PropTypes.Requireable<object>;
            commonSettingStyle: PropTypes.Requireable<object>;
            accessible: PropTypes.Requireable<boolean>;
            firstCustomOptions: PropTypes.Requireable<any[]>;
            secondCustomOptions: PropTypes.Requireable<any[]>;
            specificSetting: PropTypes.Requireable<object>;
        };
        customSetting: {
            title: PropTypes.Requireable<string>;
            options: PropTypes.Requireable<(PropTypes.InferProps<{
                component: PropTypes.Requireable<string | ((...args: any[]) => any)>;
                props: PropTypes.Requireable<object>;
            }> | null | undefined)[]>;
            accessible: PropTypes.Requireable<boolean>;
            accessibilityLabel: PropTypes.Requireable<string | number>;
        };
    };
    static defaultProps: {};
    constructor(props: Readonly<any>);
    constructor(props: any, context?: any);
}
import React from "react";