export default class PdfViewFlatList {
    /**
     * Scrolls to a given x, y offset, either immediately or with a smooth animation.
     *
     * Example:
     *
     * `scrollTo({x: 0, y: 0, animated: true})`
     *
     * Note: The weird function signature is due to the fact that, for historical reasons,
     * the function also accepts separate arguments as an alternative to the options object.
     * This is deprecated due to ambiguity (y before x), and SHOULD NOT BE USED.
     */
    scrollToXY: (x: any, y: any) => void;
}