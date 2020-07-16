// @ts-nocheck

/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { StyleSheet, View } from 'react-native';
import { ContainerWithShadowAndSeparator } from "../containerWithShadowAndSeparator";
import { adjustSize } from "../utils/sizes";
export default class ContainerWithChildren extends Component {
  static defaultProps = {
    hasShadow: true
  };

  getSizeLevel(itemCount) {
    return itemCount <= 2 ? 0 : itemCount === 3 ? 1 : itemCount === 4 ? 2 : 3;
  }

  getSelectors = () => {
    const {
      children
    } = this.props;
    const itemCount = children.length;
    const sizeLevel = this.getSizeLevel(itemCount);
    const isHorizontal = itemCount <= 2;
    const hasSeparator = isHorizontal;
    return children.map((child, index) => <Fragment key={index}>
        {hasSeparator && index > 0 ? <View style={Styles.separator} /> : null}
        {React.cloneElement(child, {
        sizeLevel,
        horizontal: isHorizontal
      })}
      </Fragment>);
  };

  render() {
    const {
      hasShadow
    } = this.props;
    const itemCount = this.props.children.length;

    if (!itemCount) {
      return null;
    }

    const sizeLevel = this.getSizeLevel(itemCount);
    const Wrap = hasShadow ? ContainerWithShadowAndSeparator : Fragment;
    return <Wrap>
        <View style={Styles.container}>
          <View style={[Styles.selectors, itemCount >= 4 ? null : [Styles.selectorsPadding0, Styles.selectorsPadding1, Styles.selectorsPadding2, Styles.selectorsPadding3][sizeLevel]]}>
            {this.getSelectors()}
          </View>
        </View>
      </Wrap>;
  }

}
const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: adjustSize(60)
  },
  selectors: {
    paddingVertical: adjustSize(60),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectorsPadding0: {
    paddingHorizontal: adjustSize(0)
  },
  selectorsPadding1: {
    paddingHorizontal: adjustSize(78)
  },
  selectorsPadding2: {
    paddingHorizontal: adjustSize(0)
  },
  selectorsPadding3: {
    paddingHorizontal: adjustSize(0)
  },
  separator: {
    width: 1,
    height: adjustSize(120),
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    marginHorizontal: adjustSize(60)
  }
});