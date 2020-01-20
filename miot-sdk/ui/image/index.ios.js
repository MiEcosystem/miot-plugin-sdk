import EdgeInsetsPropType from 'react-native/Libraries/StyleSheet/EdgeInsetsPropType';
import flattenStyle from 'react-native/Libraries/StyleSheet/flattenStyle';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode';
import ImageSourcePropType from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedImageSourcePropType';
import ImageStylePropTypes from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedImageStylePropTypes';
import PropTypes from 'prop-types';
import React from 'react';
import { requireNativeComponent, StyleSheet } from 'react-native';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import StyleSheetPropType from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedStyleSheetPropType';
export default class MHImage extends React.Component {
  static propTypes = {
    /**
     * See https://facebook.github.io/react-native/docs/image.html#style
     */
    style: StyleSheetPropType(ImageStylePropTypes),
    /**
     * The image source (either a remote URL or a local file resource).
     *
     * See https://facebook.github.io/react-native/docs/image.html#source
     */
    source: ImageSourcePropType,
    /**
     * A static image to display while loading the image source.
     *
     * See https://facebook.github.io/react-native/docs/image.html#defaultsource
     */
    defaultSource: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        scale: PropTypes.number,
      }),
      PropTypes.number,
    ]),
    /**
     * layerScaleFilter iOS only
     */
    layerScaleFilter: PropTypes.oneOf([
      'Nearest',
      'Linear',
      'Trilinear'
    ]),
    /**
     * When true, indicates the image is an accessibility element.
     *
     * See https://facebook.github.io/react-native/docs/image.html#accessible
     */
    accessible: PropTypes.bool,
    /**
     * The text that's read by the screen reader when the user interacts with
     * the image.
     *
     * See https://facebook.github.io/react-native/docs/image.html#accessibilitylabel
     */
    accessibilityLabel: PropTypes.node,
    /**
     * blurRadius: the blur radius of the blur filter added to the image
     *
     * See https://facebook.github.io/react-native/docs/image.html#blurradius
     */
    blurRadius: PropTypes.number,
    /**
     * See https://facebook.github.io/react-native/docs/image.html#capinsets
     */
    capInsets: EdgeInsetsPropType,
    /**
     * See https://facebook.github.io/react-native/docs/image.html#resizemethod
     */
    resizeMethod: PropTypes.oneOf(['auto', 'resize', 'scale']),
    /**
     * Determines how to resize the image when the frame doesn't match the raw
     * image dimensions.
     *
     * See https://facebook.github.io/react-native/docs/image.html#resizemode
     */
    resizeMode: PropTypes.oneOf([
      'cover',
      'contain',
      'stretch',
      'repeat',
      'center',
    ]),
    /**
     * A unique identifier for this element to be used in UI Automation
     * testing scripts.
     *
     */
    testID: PropTypes.string,
    /**
     * Invoked on mount and layout changes with
     * `{nativeEvent: {layout: {x, y, width, height}}}`.
     */
    onLayout: PropTypes.func,
    /**
     * Invoked on load start.
     *
     */
    onLoadStart: PropTypes.func,
    /**
     * Invoked on download progress with `{nativeEvent: {loaded, total}}`.
     */
    onProgress: PropTypes.func,
    /**
     * Invoked on load error with `{nativeEvent: {error}}`.
     */
    onError: PropTypes.func,
    /**
     * Invoked when a partial load of the image is complete.
     */
    onPartialLoad: PropTypes.func,
    /**
     * Invoked when load completes successfully.
     */
    onLoad: PropTypes.func,
    /**
     * Invoked when load either succeeds or fails.
     */
    onLoadEnd: PropTypes.func,
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
  static getSize(uri, success, failure) {
    ImageViewManager.getSize(
      uri,
      success,
      failure ||
      function () {
        console.warn('Failed to get size for image: ' + uri);
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
    return ImageViewManager.prefetchImage(url);
  }
  render() {
    const source = resolveAssetSource(this.props.source) || {
      uri: undefined,
      width: undefined,
      height: undefined,
    };
    let sources;
    let style;
    if (Array.isArray(source)) {
      style = flattenStyle([styles.base, this.props.style]) || {};
      sources = source;
    } else {
      const { width, height, uri } = source;
      style =
        flattenStyle([{ width, height }, styles.base, this.props.style]) || {};
      sources = [source];
      if (uri === '') {
        console.warn('source.uri should not be an empty string');
      }
    }
    const resizeMode =
      this.props.resizeMode || (style || {}).resizeMode || 'cover'; // Workaround for flow bug t7737108
    const tintColor = (style || {}).tintColor; // Workaround for flow bug t7737108
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
    return (
      <MHImageView
        {...this.props}
        style={style}
        resizeMode={resizeMode}
        tintColor={tintColor}
        source={sources}
      />
    );
  }
};
const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },
});
const MHImageView = requireNativeComponent('MHImageView', null);