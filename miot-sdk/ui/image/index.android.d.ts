export default class MHImage {
    static propTypes: any;
    static resizeMode: any;
    /**
     * Resolves an asset reference into an object.
     */
    static resolveAssetSource: any;
    /**
     * Retrieve the width and height (in pixels) of an image prior to displaying it.
     *
     * See https://facebook.github.io/react-native/docs/image.html#getsize
     */
    static getSize(url: any, success: any, failure: any): any;
    /**
     * Prefetches a remote image for later use by downloading it to the disk
     * cache.
     *
     * See https://facebook.github.io/react-native/docs/image.html#prefetch
     */
    static prefetch(url: any, callback: any): any;
    static abortPrefetch(requestId: any): void;
    static contextTypes: {
        isInAParentText: PropTypes.Requireable<boolean>;
    };
    queryCache(urls: any): any;
    render(): JSX.Element;
}