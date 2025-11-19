export default function useManualSceneList({ source, getType, filterClosed, specificSceneIds }: {
    source?: string | undefined;
    getType?: number | undefined;
    filterClosed?: boolean | undefined;
    specificSceneIds?: any[] | undefined;
}): never[];