export default function specifyComponent(UIComponent: any, adapter: any): {
    new (props: any): {
        state: {};
        listeners: any[];
        values: any;
        componentDidMount(): void;
        componentWillUnmount(): void;
        setState: <K extends string | number | symbol>(state: any, callback?: (() => void) | undefined) => void;
        listenSpecs(specs: any[] | undefined, values: any[] | undefined, fn: any, defaultValues?: any[]): void;
        watch(): void;
        unwatch(): void;
        render(): JSX.Element | null;
        context: any;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<any> & Readonly<{
            children?: React.ReactNode;
        }>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>): any;
        componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): void;
    };
    propTypes: {
        specs: PropTypes.Requireable<any[]>;
        defaultValues: PropTypes.Requireable<any[]>;
    };
    contextType?: React.Context<any> | undefined;
} | null;