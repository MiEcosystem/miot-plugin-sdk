export function getSpecKey({ siid, piid, eiid }: {
    siid: any;
    piid: any;
    eiid: any;
}, prefix: any): string;
export function listen(spec: any, fn: any): {
    remove(): void;
} | undefined;
export function setProps(specs?: any[]): any;