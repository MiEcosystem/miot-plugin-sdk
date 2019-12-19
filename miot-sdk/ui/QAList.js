import React, {Component}  from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {adjustSize} from '../utils/sizes';
import {FontDefault} from '../utils/fonts';
export default class QAList extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string
    }))
  };
  static defaultProps = {
    list: []
  };
  getList() {
    let {list} = this.props;
    if(!list || !list.length) {
      return [];
    }
    return list.map((item, index) => {
      let {title, text} = item;
      return (
        <View key={String(index)} style={Styles.item}>
          <Text style={Styles.title}>{title || ''}</Text>
          <Text style={Styles.text}>{text || ''}</Text>
        </View>
      );
    });
  }
  render() {
    let list = this.getList();
    if(!list || !list.length) {
      return null;
    }
    return (
      <View style={Styles.container}>
        {list}
      </View>
    );
  }
}
const Styles = {
  container: {
    marginHorizontal: adjustSize(72)
  },
  item: {
    marginBottom: adjustSize(45)
  },
  title: {
    fontFamily: FontDefault,
    fontSize: adjustSize(36),
    fontWeight: '600',
    color: '#4C4C4C'
  },
  text: {
    fontFamily: FontDefault,
    fontSize: adjustSize(42),
    lineHeight: adjustSize(78),
    color: '#7F7F7F',
    marginTop: adjustSize(9)
  }
};