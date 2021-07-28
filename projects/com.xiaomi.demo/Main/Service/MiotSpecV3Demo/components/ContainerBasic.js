import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class ContainerBasic extends Component {
  static propTypes = {
    iid: PropTypes.any,
    siid: PropTypes.any,
    name: PropTypes.string,
    description: PropTypes.string
  };
  render() {
    const { iid, name, children, description, siid } = this.props;
    return (
      <View style={Styles.container}>
        <View style={Styles.titleContainer}>
          <Text style={Styles.title}>{name || description} / { siid ? 'siid' : 'miid' }: {iid || 'none'}</Text>
        </View>
        <View style={Styles.listContainer}>{children}</View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#fefefe',
    marginTop: 10,
    padding: 10,
    paddingBottom: 0
  },
  titleContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#eee'
  },
  title: {
    fontSize: 14,
    lineHeight: 21
  },
  listContainer: {
    paddingVertical: 10
  }
});
