export default function useSwitchInfo(did?: string): {
    switchInfo: any;
    editSwitchInfo: (memberId: any, member: any) => Promise<any>;
};