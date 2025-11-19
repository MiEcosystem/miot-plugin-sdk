export function injectContext(target: any): void;
export const SDKContext: any;
export const SDKContextConsumer: any;
export function SDKContextProvider(props: any): JSX.Element;
export function withSDKContext(Component: any): {
    new (): {
        [x: string]: any;
        render(): JSX.Element;
    };
    [x: string]: any;
};