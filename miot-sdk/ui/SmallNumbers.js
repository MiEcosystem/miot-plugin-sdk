//@native begin
import React, {PureComponent, Fragment} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PropTypes from 'prop-types';
import {adjustSize} from '../utils/sizes';
import {FontDefault, FontKmedium} from '../utils/fonts';
import {ColorGreen} from '../utils/colors';
export default class SmallNumber extends PureComponent {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      number: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]),
      themeColor: PropTypes.any
    })),
    themeColor: PropTypes.any
  };
  getItems = () => {
    let {list, themeColor} = this.props;
    return list.filter(item => {
      return item && (item.title !== undefined) && (item.number !== undefined);
    }).map((item, index) => {
      let {title, number} = item;
      let theme = item.themeColor || themeColor;
      return (
        <Fragment key={index}>
          {index > 0 ? (
            <View style={Styles.separator}></View>
          ) : null}
          <View style={Styles.item}>
            <Text style={[Styles.number, theme ? {
              color: theme
            } : null, isNaN(number) ? {
              fontSize: adjustSize(88)
            } : null]}>{number}</Text>
            <Text style={Styles.title}>{title}</Text>
          </View>
        </Fragment>
      );
    });
  }
  render() {
    let {list, themeColor} = this.props;
    if(!list || !list.length) {
      return null;
    }
    let items = this.getItems();
    return (
      <View style={Styles.container}>
        {items}
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: adjustSize(30)
  },
  separator: {
    width: adjustSize(3),
    height: adjustSize(135),
    marginHorizontal: adjustSize(45),
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  item: {
    alignItems: 'center'
  },
  title: {
    fontSize: adjustSize(36),
    fontFamily: FontDefault,
    color: '#1C2229',
    opacity: 1
  },
  number: {
    fontSize: adjustSize(102),
    fontFamily: FontKmedium,
    lineHeight: adjustSize(123),
    color: '#1C2229',
    opacity: 0.6
  }
});
//@native end