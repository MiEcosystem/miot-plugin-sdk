declare class GlobalStore<T> {
    private static instance;
    private prefix;
    private store;
    private constructor();
    static getInstance(): GlobalStore;
    getValue(key: any): T;
    setValue(key: any, value: any): void;
}
export default GlobalStore;
