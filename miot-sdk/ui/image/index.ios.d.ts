export default class MHImage {
    static propTypes: {
        /**
         * See https://facebook.github.io/react-native/docs/image.html#style
         */
        style: any;
        /**
         * The image source (either a remote URL or a local file resource).
         *
         * See https://facebook.github.io/react-native/docs/image.html#source
         */
        source: any;
        /**
         * A static image to display while loading the image source.
         *
         * See https://facebook.github.io/react-native/docs/image.html#defaultsource
         */
        defaultSource: any;
        /**
         * layerScaleFilter iOS only
         */
        layerScaleFilter: any;
        /**
         * When true, indicates the image is an accessibility element.
         *
         * See https://facebook.github.io/react-native/docs/image.html#accessible
         */
        accessible: any;
        /**
         * The text that's read by the screen reader when the user interacts with
         * the image.
         *
         * See https://facebook.github.io/react-native/docs/image.html#accessibilitylabel
         */
        accessibilityLabel: any;
        /**
         * blurRadius: the blur radius of the blur filter added to the image
         *
         * See https://facebook.github.io/react-native/docs/image.html#blurradius
         */
        blurRadius: any;
        /**
         * See https://facebook.github.io/react-native/docs/image.html#capinsets
         */
        capInsets: any;
        /**
         * See https://facebook.github.io/react-native/docs/image.html#resizemethod
         */
        resizeMethod: any;
        /**
         * Determines how to resize the image when the frame doesn't match the raw
         * image dimensions.
         *
         * See https://facebook.github.io/react-native/docs/image.html#resizemode
         */
        resizeMode: any;
        /**
         * A unique identifier for this element to be used in UI Automation
         * testing scripts.
         *
         */
        testID: any;
        /**
         * Invoked on mount and layout changes with
         * `{nativeEvent: {layout: {x, y, width, height}}}`.
         */
        onLayout: any;
        /**
         * Invoked on load start.
         *
         */
        onLoadStart: any;
        /**
         * Invoked on download progress with `{nativeEvent: {loaded, total}}`.
         */
        onProgress: any;
        /**
         * Invoked on load error with `{nativeEvent: {error}}`.
         */
        onError: any;
        /**
         * Invoked when a partial load of the image is complete.
         */
        onPartialLoad: any;
        /**
         * Invoked when load completes successfully.
         */
        onLoad: any;
        /**
         * Invoked when load either succeeds or fails.
         */
        onLoadEnd: any;
        /**
         * img url
         */
        src: any;
    };
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
    static getSize(uri: any, success: any, failure: any): void;
    /**
     * Prefetches a remote image for later use by downloading it to the disk
     * cache.
     *
     * See https://facebook.github.io/react-native/docs/image.html#prefetch
     */
    static prefetch(url: any): any;
    render(): JSX.Element;
}