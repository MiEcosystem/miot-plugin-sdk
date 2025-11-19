export default class PdfView extends Component<any, any, any> {
    static propTypes: any;
    static defaultProps: {
        path: string;
        password: string;
        scale: number;
        minScale: number;
        maxScale: number;
        spacing: number;
        style: {};
        fitPolicy: number;
        horizontal: boolean;
        centerContent: boolean;
        page: number;
        currentPage: number;
        enablePaging: boolean;
        onPageSingleTap: (page: any, x: any, y: any) => void;
        onScaleChanged: (scale: any) => void;
    };
    constructor(props: any);
    _flatList: any;
    _scaleTimer: any;
    _scrollTimer: NodeJS.Timeout;
    _mounted: boolean;
    _keyExtractor: (item: any, index: any) => string;
    _getPageWidth: () => number;
    _getPageHeight: () => number;
    _renderSeparator: () => JSX.Element;
    _onItemSingleTap: (index: any, x: any, y: any) => void;
    _onItemDoubleTap: (index: any) => void;
    _onScaleChanged: (pinchInfo: any) => void;
    _renderItem: ({ item, index }: {
        item: any;
        index: any;
    }) => JSX.Element;
    _onViewableItemsChanged: (viewableInfo: any) => void;
    _onPageChanged: (page: any, numberOfPages: any) => void;
    _getRef: (ref: any) => any;
    _getItemLayout: (data: any, index: any) => {
        length: number;
        offset: number;
        index: any;
    };
    _onScroll: (e: any) => void;
    _onListContentSizeChange: (contentWidth: any, contentHeight: any) => void;
    _renderList: () => JSX.Element;
    _onLayout: (event: any) => void;
}
import { Component } from "react";