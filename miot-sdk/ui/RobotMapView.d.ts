export default class RobotMapView extends React.Component<any, any, any> {
    static propTypes: any;
    constructor(props: any, context: any);
    updateData(pointsStr: any, autoCenter: any, robotImage: any, scaleToFit: any): void;
    positionForImage(name: any): Promise<any>;
    cleanMapView(): void;
}
import React from "react";