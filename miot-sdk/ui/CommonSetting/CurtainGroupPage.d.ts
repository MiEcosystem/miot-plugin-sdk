export default class CurtainGroupPage extends React.Component<any, any, any> {
    static navigationOptions: ({ navigation }: {
        navigation: any;
    }) => {
        header: JSX.Element;
    };
    constructor(props: Readonly<any>);
    constructor(props: any, context?: any);
    checkLoop: any;
    devicestatus: any;
    colorScheme: "light" | "dark";
    selectLeft: () => void;
    selectRight: () => void;
    swap: () => void;
    actLeft: () => void;
    actRight: () => void;
    act: (did: any) => void;
    create: () => void;
    cancel: () => void;
    showError: () => void;
    showHand: () => void;
    select: (selectedIndexs: any) => void;
    getChoices: () => void;
    tryInitChoices: (choices: any, count: any, total: any) => void;
}
import React from "react";