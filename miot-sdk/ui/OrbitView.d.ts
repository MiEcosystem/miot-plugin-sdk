export default class OrbitView extends React.Component<any, any, any> {
    static propTypes: {
        lineColor: PropTypes.Requireable<string>;
        lineWidth: PropTypes.Requireable<number>;
        scale: PropTypes.Requireable<number>;
        deviceWidth: PropTypes.Requireable<number>;
        deviceHeight: PropTypes.Requireable<number>;
        maxPressure: PropTypes.Requireable<number>;
        revokeTimes: PropTypes.Requireable<number>;
    };
    constructor(props: Readonly<any>);
    constructor(props: any, context?: any);
    orbitView: any;
    /**
     * 渲染点
     * @param {<PointObject[]>} points : 路径所包含的点的数组{x:1,y:2,pressure:, state:{Int}}
     */
    displayPoints(points: any): void;
    /**
     * 是否可撤销
     * @return {object} 成功时：bool, 失败时 [string, null, string]
     * @readonly
     */
    readonly canRevoke(): object;
    /**
     * 撤销
     */
    revoke(): void;
    /**
     * 清除
     */
    clear(): void;
}
import React from "react";