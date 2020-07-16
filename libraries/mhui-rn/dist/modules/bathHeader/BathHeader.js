// @ts-nocheck

/* eslint-disable */
import React, { Fragment } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { adjustSize } from "../utils/sizes";
import { FontDefault } from "../utils/fonts";
export default function BathHeader(props) {
  const {
    titles,
    subtitle
  } = props;
  const filteredTitles = titles.filter(title => !!title);
  const filteredTitlesCount = filteredTitles.length;
  const titleDoms = filteredTitles.map((title, index) => <Fragment key={title}>
      {index > 0 ? <View style={[Styles.separator, {
      0: Styles.separator1,
      1: Styles.separator1,
      2: Styles.separator2,
      3: Styles.separator3,
      4: Styles.separator4
    }[filteredTitlesCount]]} /> : null}
      <Text style={[Styles.title, {
      0: Styles.title1,
      1: Styles.title1,
      2: Styles.title2,
      3: Styles.title3,
      4: Styles.title4
    }[filteredTitlesCount]]}>
        {title}
      </Text>
    </Fragment>);
  return <View style={Styles.container}>
      <Text style={Styles.subtitle}>{subtitle || ' '}</Text>
      <View style={Styles.titles}>
        {titleDoms}
      </View>
    </View>;
}
BathHeader.defaultProps = {
  titles: [],
  subtitle: ''
};
const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: adjustSize(204),
    paddingBottom: adjustSize(180)
  },
  subtitle: {
    fontSize: adjustSize(60),
    fontFamily: FontDefault,
    color: '#fff',
    textAlign: 'center',
    lineHeight: adjustSize(81),
    marginBottom: adjustSize(15)
  },
  separator: {
    width: adjustSize(3),
    height: adjustSize(28.5 * 3),
    marginHorizontal: adjustSize(45),
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },
  separator1: {
    height: 0
  },
  separator2: {
    height: adjustSize(31.4 * 3)
  },
  separator3: {
    height: adjustSize(28.5 * 3)
  },
  separator4: {
    height: adjustSize(28.5 * 3)
  },
  titles: {
    minHeight: adjustSize(192),
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: adjustSize(90),
    fontFamily: FontDefault,
    color: '#fff'
  },
  title1: {
    fontSize: adjustSize(144)
  },
  title2: {
    fontSize: adjustSize(120)
  },
  title3: {
    fontSize: adjustSize(108)
  },
  title4: {
    fontSize: adjustSize(90)
  }
});