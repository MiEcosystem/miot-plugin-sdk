export function resetClassVariables(): void;
export default class FirmwareUpgradeAuto extends React.Component<any, any, any> {
    static navigationOptions: ({ navigation }: {
        navigation: any;
    }) => {
        header: JSX.Element;
    };
    constructor(props: any, context: any);
    pageUpdated: boolean;
    upgradeMonitorRegisted: boolean;
    continuMonitor: boolean;
    upgradeInfoFetchFailedCount: number;
    waitingUpgardeInfoUpdateTime: number;
    spinValue: any;
    upgradeStartTimeStamp: number;
    upgradeEndTimeStamp: number;
    spin: any;
    accessible: any;
    accessibilityLabel: any;
    accessibilityHint: any;
    isReallyMounted: boolean;
    startAnimation(): void;
    backListener: any;
    _bottomSheetListener: any;
    fetchHighTextContrastState(): void;
    fetchAutoUpgradeConfig(): void;
    updateAutoUpgradeText(): void;
    last_status: null;
    fetchUpgradeInfo(): Promise<any>;
    lastCachedLatest: any;
    lastCachedCurrent: any;
    autoUpgradeDeviceSwitchEnableChanged: (value: any) => void;
    triggleUpgradeDevice(): void;
    fetchUpgradeInfoMonitor(): void;
    updateTimeStart: number | undefined;
    getUpgradeInfoLoop(): void;
    timer: NodeJS.Timeout | undefined;
    stopFetchUpgradeInfoMonitor(): void;
    getTimePrefixWithTimestamp(timestamp: any): 1 | 3 | 2;
    generateUpgradeStatu(data: any): "success" | "init" | "offline" | "downloading" | "failed" | "needupdate" | "timeout" | "installing" | "busy" | "unknown";
    checkDeviceWasher(): boolean;
    otaInfoView(): JSX.Element | null;
    otaTimer: NodeJS.Timeout | undefined;
}
import React from "react";