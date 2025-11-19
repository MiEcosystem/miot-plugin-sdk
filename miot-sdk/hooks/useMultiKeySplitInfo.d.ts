export default function useMultiKeySplitInfo(): ({
    count: number;
    split: boolean;
} | ((split: any) => void))[];