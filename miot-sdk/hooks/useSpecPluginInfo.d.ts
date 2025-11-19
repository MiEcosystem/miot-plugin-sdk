export default function useSpecPluginInfo(): ({
    hasSpecPlugin: boolean;
    defaultPluginType: number;
} | ((type: any) => void))[];