export function getColorTemperatureColor(colorTemperature: any, [min, max, step]: [any, any, any]): any;
export class Background extends React.PureComponent<any, any, any> {
    static propTypes: {
        disabled: PropTypes.Requireable<boolean>;
        brightness: PropTypes.Requireable<number>;
        supportBrightness: PropTypes.Requireable<boolean>;
        color: PropTypes.Requireable<string>;
        supportColor: PropTypes.Requireable<boolean>;
        colorTemperature: PropTypes.Requireable<number>;
        supportColorTemperature: PropTypes.Requireable<boolean>;
        colorTemperatureRange: PropTypes.Requireable<(number | null | undefined)[]>;
        pos: PropTypes.Requireable<PropTypes.InferProps<{
            pageX: PropTypes.Requireable<number>;
            pageY: PropTypes.Requireable<number>;
        }>>;
        SourceBgOff: PropTypes.Requireable<any>;
    };
    constructor(props: Readonly<any>);
    constructor(props: any, context?: any);
}
export default class LightControl extends React.Component<any, any, any> {
    static propTypes: {
        disabled: PropTypes.Requireable<boolean>;
        supportBrightness: PropTypes.Requireable<boolean>;
        brightness: PropTypes.Requireable<number>;
        brightnessRange: PropTypes.Requireable<(number | null | undefined)[]>;
        onBrightnessChanging: PropTypes.Requireable<(...args: any[]) => any>;
        onBrightnessChanged: PropTypes.Requireable<(...args: any[]) => any>;
        supportColor: PropTypes.Requireable<boolean>;
        color: PropTypes.Requireable<number>;
        onColorChanging: PropTypes.Requireable<(...args: any[]) => any>;
        onColorChanged: PropTypes.Requireable<(...args: any[]) => any>;
        supportColorTemperature: PropTypes.Requireable<boolean>;
        colorTemperature: PropTypes.Requireable<number>;
        colorTemperatureRange: PropTypes.Requireable<(number | null | undefined)[]>;
        onColorTemperatureChanging: PropTypes.Requireable<(...args: any[]) => any>;
        onColorTemperatureChanged: PropTypes.Requireable<(...args: any[]) => any>;
        onSetStart: PropTypes.Requireable<(...args: any[]) => any>;
        onSetEnd: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        disabled: boolean;
        supportBrightness: boolean;
        brightness: number;
        brightnessRange: number[];
        onBrightnessChanging: typeof log;
        onBrightnessChanged: typeof log;
        supportColor: boolean;
        color: number;
        onColorChanging: typeof log;
        onColorChanged: typeof log;
        supportColorTemperature: boolean;
        colorTemperature: number;
        colorTemperatureRange: number[];
        onColorTemperatureChanging: typeof log;
        onColorTemperatureChanged: typeof log;
        onSetStart: typeof log;
        onSetEnd: typeof log;
    };
    constructor(props: Readonly<any>);
    constructor(props: any, context?: any);
    brightnessPercent: any;
    colorPercent: any;
    colorTemperaturePercent: any;
    width: any;
    height: any;
    onLayout: (e: any) => void;
    initResponders(): void;
    responders: {
        onStartShouldSetResponder: () => any;
        onResponderGrant: (e: any) => void;
        onResponderMove: (e: any) => void;
        onResponderRelease: () => void;
    } | null | undefined;
    removeResponders(): void;
}
import React from "react";