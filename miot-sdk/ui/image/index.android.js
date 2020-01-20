import flattenStyle from 'react-native/Libraries/StyleSheet/flattenStyle';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode';
import ImageStylePropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedImageStylePropTypes';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, NativeModules, requireNativeComponent, StyleSheet, ViewPropTypes } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import StyleSheetPropType from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedStyleSheetPropType';
import { ViewContextTypes } from './ViewContext';
var merge = require('merge');
var { ImageLoader } = NativeModules;
let _requestId = 1;
function generateRequestId() {
  return _requestId++;
}
export default class MHImage extends React.Component {
  static propTypes = {
    ...ViewPropTypes,
    style: StyleSheetPropType(ImageStylePropTypes),
    /**
     * See https://facebook.github.io/react-native/docs/image.html#source
     */
    source: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
        headers: PropTypes.objectOf(PropTypes.string),
      }),
      // Opaque type returned by require('./image.jpg')
      PropTypes.number,
      // Multiple sources
      PropTypes.arrayOf(
        PropTypes.shape({
          uri: PropTypes.string,
          width: PropTypes.number,
          height: PropTypes.number,
          headers: PropTypes.objectOf(PropTypes.string),
        }),
      ),
    ]),
    /**
     * blurRadius: the blur radius of the blur filter added to the image
     *
     * See https://facebook.github.io/react-native/docs/image.html#blurradius
     */
    blurRadius: PropTypes.number,
    /**
     * See https://facebook.github.io/react-native/docs/image.html#loadingindicatorsource
     */
    loadingIndicatorSource: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
      }),
      // Opaque type returned by require('./image.jpg')
      PropTypes.number,
    ]),
    progressiveRenderingEnabled: PropTypes.bool,
    fadeDuration: PropTypes.number,
    /**
     * Invoked on load start
     */
    onLoadStart: PropTypes.func,
    /**
     * Invoked on load error
     */
    onError: PropTypes.func,
    /**
     * Invoked when load completes successfully
     */
    onLoad: PropTypes.func,
    /**
     * Invoked when load either succeeds or fails
     */
    onLoadEnd: PropTypes.func,
    /**
     * Used to locate this view in end-to-end tests.
     */
    testID: PropTypes.string,
    /**
     * The mechanism that should be used to resize the image when the image's dimensions
     * differ from the image view's dimensions. Defaults to `auto`.
     *
     * See https://facebook.github.io/react-native/docs/image.html#resizemethod
     */
    resizeMethod: PropTypes.oneOf(['auto', 'resize', 'scale']),
    /**
     * Determines how to resize the image when the frame doesn't match the raw
     * image dimensions.
     *
     * See https://facebook.github.io/react-native/docs/image.html#resizemode
     */
    resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch', 'center']),
  }
  static resizeMode = ImageResizeMode
  /**
   * Resolves an asset reference into an object.
   */
  static resolveAssetSource = resolveAssetSource
  /**
   * Retrieve the width and height (in pixels) of an image prior to displaying it.
   *
   * See https://facebook.github.io/react-native/docs/image.html#getsize
   */
  static getSize(url, success, failure) {
    return ImageLoader.getSize(url)
      .then(function (sizes) {
        success(sizes.width, sizes.height);
      })
      .catch(
        failure ||
        function () {
          console.warn('Failed to get size for image: ' + url);
        },
      );
  }
  /**
   * Prefetches a remote image for later use by downloading it to the disk
   * cache.
   *
   * See https://facebook.github.io/react-native/docs/image.html#prefetch
   */
  static prefetch(url) {
    const requestId = generateRequestId();
    callback && callback(requestId);
    return ImageLoader.prefetchImage(url, requestId);
  }
  static abortPrefetch(requestId) {
    ImageLoader.abortRequest(requestId);
  }
  queryCache(urls) {
    return ImageLoader.queryCache(urls);
  }
  static contextTypes = ViewContextTypes
  render() {
    const source = resolveAssetSource(this.props.source);
    const loadingIndicatorSource = resolveAssetSource(
      this.props.loadingIndicatorSource,
    );
    // As opposed to the ios version, here we render `null` when there is no source, source.uri
    // or source array.
    if (source && source.uri === '') {
      console.warn('source.uri should not be an empty string');
    }
    if (this.props.src) {
      console.warn(
        'The <Image> component requires a `source` property rather than `src`.',
      );
    }
    if (this.props.children) {
      throw new Error(
        'The <Image> component cannot contain children. If you want to render content on top of the image, consider using the <ImageBackground> component or absolute positioning.',
      );
    }
    if (source && (source.uri || Array.isArray(source))) {
      let style;
      let sources;
      if (source.uri) {
        const { width, height } = source;
        style = flattenStyle([{ width, height }, styles.base, this.props.style]);
        sources = [{ uri: source.uri }];
      } else {
        style = flattenStyle([styles.base, this.props.style]);
        sources = source;
      }
      const { onLoadStart, onLoad, onLoadEnd, onError } = this.props;
      const nativeProps = merge(this.props, {
        style,
        shouldNotifyLoadEvents: !!(
          onLoadStart ||
          onLoad ||
          onLoadEnd ||
          onError
        ),
        src: sources,
        headers: source.headers,
        loadingIndicatorSrc: loadingIndicatorSource
          ? loadingIndicatorSource.uri
          : null,
      });
      if (this.context.isInAParentText) {
        return <Image {...nativeProps} />;
      } else {
        return <RKImage {...nativeProps} />;
      }
    }
    return null;
  }
};
var styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});
var cfg = {
  nativeOnly: {
    src: true,
    headers: true,
    loadingIndicatorSrc: true,
    shouldNotifyLoadEvents: true,
  },
};
var RKImage = requireNativeComponent('MHImageView', MHImage, cfg);
// var RCTTextInlineImage = requireNativeComponent(
//     'RCTTextInlineImage',
//     MHImage,
//     cfg,
// );