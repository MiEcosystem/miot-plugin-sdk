export default class BTInterconnection extends React.Component<any, any, any> {
    static navigationOptions: ({ navigation }: {
        navigation: any;
    }) => {
        header: JSX.Element;
    };
    constructor(props: Readonly<any>);
    constructor(props: any, context?: any);
    navigationProps: {
        category: string;
        sameRoom: boolean;
        minRssi: number;
        accessible: boolean;
        addAccessibilityHint: string;
        removeAccessibilityHint: string;
    };
    dialogButtons: {
        text: string;
        callback: () => void;
    }[];
    timerToast: null;
    showToast: (message: any) => void;
    scanListener: null;
    onDismiss: () => void;
    getSupportedDevicesWithLinkage: () => void;
    tryToggleLinkage: (mac: any, pdid: any, linked: any) => void;
    tryRemoveLinkage: (mac: any) => void;
    removeLinkage: (mac: any) => void;
    tryAddLinkage: (mac: any, pdid: any) => void;
    addLinkageCache: {};
    addLinkage: (mac: any, clicked: any, rssi: any) => void;
}
import React from "react";