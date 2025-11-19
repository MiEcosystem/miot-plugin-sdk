export namespace PackageEvent {
    namespace packageWillLoad {
        const local: boolean;
    }
    namespace packageDidLoaded {
        const local_1: boolean;
        export { local_1 as local };
    }
    namespace packageWillPause {
        const always: boolean;
    }
    namespace packageDidResume {
        const always_1: boolean;
        export { always_1 as always };
    }
    namespace packageAuthorizationAgreed {
        const always_2: boolean;
        export { always_2 as always };
    }
    namespace packageAuthorizationCancel {
        export function always_3(emitter: any): () => void;
        export { always_3 as always };
        export const sameas: string;
    }
    namespace packageReceivedInformation {
        const always_4: boolean;
        export { always_4 as always };
        const sameas_1: string;
        export { sameas_1 as sameas };
    }
    namespace packageWillExit {
        const always_5: boolean;
        export { always_5 as always };
    }
    namespace packageViewWillAppear {
        const always_6: boolean;
        export { always_6 as always };
        const sameas_2: string;
        export { sameas_2 as sameas };
    }
    namespace packageReceivedOutAppInformation {
        const always_7: boolean;
        export { always_7 as always };
    }
    namespace packageViewWillDisappearIOS {
        const always_8: boolean;
        export { always_8 as always };
        const sameas_3: string;
        export { sameas_3 as sameas };
    }
    namespace packageWillStopAndroid {
        const always_9: boolean;
        export { always_9 as always };
        const sameas_4: string;
        export { sameas_4 as sameas };
    }
}