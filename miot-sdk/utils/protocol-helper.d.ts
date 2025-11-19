export namespace CLOUD_PRIVACY_EVENT_TYPE {
    const AGREED: string;
    const FAILED: string;
    const POP_DIALOG_SUCCESS: string;
}
export namespace PrivacyEvent {
    namespace cloudPrivacyEvent {
        const always: boolean;
    }
}
export namespace USER_EXP_PLAN_EVENT_TYPE {
    const AGREED_1: string;
    export { AGREED_1 as AGREED };
    export const CANCELED: string;
    export const DISABLED: string;
    const POP_DIALOG_SUCCESS_1: string;
    export { POP_DIALOG_SUCCESS_1 as POP_DIALOG_SUCCESS };
}
export namespace UserExpPlanEvent {
    namespace userExpPlanEvent {
        function forever(emitter: any): (message: any) => void;
    }
}
export default class ProtocolManager {
    static _legalInfoAuthHasShowed: boolean;
    static _HostUILegalAlertHasShowed: boolean;
    static _SendCloudPrivacyEventFinished: boolean;
    static _UniUrl: string;
    static ProtocolManager_NeedShowPrivacyAlert: string;
    static ProtocolManager_OldNetProtocolProceed: string;
    static ProtocolManager_PrivacyShowing: string;
    static ProtocolManager_PrivacyAgree: string;
    static ProtocolManager_PrivacyAgreedBefore: string;
    static ProtocolManager_PrivacyAgreeChanges: string;
    static ProtocolManager_PrivacyRejected: string;
    static ProtocolManager_PrivacyAgreeLocal: string;
    static ProtocolManager_PrivacyUrlEmpty: string;
    static pluginLegalInformationCheck(): Promise<any>;
    static getLegalAuthInfoProtocolAndAlertPrivacyWithParams(params?: {}, ifSendCloudPrivacyEvent?: boolean): Promise<any>;
    static showProcotolAlert(protocol: any): Promise<any>;
    static BatchAuthConfig_ALREADYAUTHED: string;
    static getBatchAuthConfigDatas(): Promise<any>;
    static getLegalAuthInfoProtocol(): Promise<any>;
    static setDefaultNativeVersion(): void;
    static setLegalInfoAuthHasShowed(showed: any): void;
    static getLegalInfoAuthHasShowed(): boolean;
    static setHostUILegalAlertHasShowed(showed: any): void;
    static getHostUILegalAlertHasShowed(): boolean;
    static setSendCloudPrivacyEventFinished(showed: any): void;
    static getSendCloudPrivacyEventFinished(): boolean;
    static _resolveUniParamsV2(params: any): string;
    static _resolveUniUrlV2(url: any, params: any, serverCode: any): string;
    static resolveUrl(rawUrl: any): any;
    static resolveUrlWithLink(url: any): any;
    /**
     *隐私需要转换一次url
     * */
    static resolveUrlOption(optionOriginal: any): any;
    static protocolMangerReportLog(...logs: any[]): void;
    static sendCloudPrivacyEvent(type: any, message: any): void;
}