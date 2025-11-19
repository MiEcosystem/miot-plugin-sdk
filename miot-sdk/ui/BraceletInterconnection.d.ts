export default class BraceletInterconnection extends React.Component<any, any, any> {
    static navigationOptions: ({ navigation }: {
        navigation: any;
    }) => {
        header: JSX.Element;
    };
    constructor(props: any);
    navigationProps: {
        title: string;
        onDisconnect: (mac: any, callback: any) => void;
        onConnect: (mac: any, callback: any) => void;
        accessible: boolean;
        searchAccessibilityHint: string;
        connectAccessibilityHint: string;
        disconnectAccessibilityHint: string;
    };
    rotateValue: any;
    rotateData: any;
    _searchBracelet(time?: number): void;
    _scanBracelet(time: any): Promise<any>;
    _getBrecelet(time: any): Promise<any>;
    __rotate(duration: any): void;
    _alertRemoveConnection(mac: any): void;
    __removeConnection(mac: any): void;
    _alertAddConnection(mac: any): void;
    __addConnection(mac: any): void;
    _showToast(message: any, duration?: number): void;
}
import React from "react";