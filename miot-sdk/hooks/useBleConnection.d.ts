export default function useBleConnection(): number;
export function getValue(): number;
export function addListener(cb: any): any;
export namespace State {
    const NOTSUPPORT: number;
    const IDLE: number;
    const CONNECTING: number;
    const CONNECTED: number;
}