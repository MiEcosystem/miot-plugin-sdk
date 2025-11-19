export default function useSpecificTagsSceneList({ tags, mode }: {
    tags?: any[] | undefined;
    mode: any;
}): {
    tagsSceneList: any;
    editTagsScene: (scene: any) => Promise<any>;
    deleteTagsScene: (scene_id: any) => Promise<any>;
    tagsSceneListLoading: boolean;
};