'use strict';

import React, { useState, useCallback } from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

const SdkComponentDemo = (props) => {
  const { navigation } = props;

  const navigateToScreen = (routerName, title) => {
    if (navigation && routerName) {
      navigation.navigate(routerName, { title });
    }
  };
  const renderListSection = (items) => (
    <View style={styles.sectionContainer}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.itemContainer}
          onPress={() => navigateToScreen(item.router, item.label)}
        >
          <Text style={styles.itemText}>{item.label}</Text>
          <Text style={styles.arrow}>{'>'}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
  const projectItems = [
    { label: '基础组件库', router: 'BasicComponentDemo' },
    { label: 'IoT组件库', router: 'IotComponentDemo' }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>标插SDK组件库</Text>
      {renderListSection(projectItems)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F7F7',
    paddingTop: 30
  },
  header: {
    fontSize: 24,
    color: '#000',
    fontWeight: '500',
    paddingHorizontal: 15,
    marginBottom: 20
  },
  sectionContainer: {
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 5
  },
  sectionTitle: {
    fontSize: 12,
    color: '#999',
    paddingHorizontal: 15,
    paddingVertical: 8
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.12)'
  },
  itemText: {
    fontSize: 16,
    color: '#000'
  },
  arrow: {
    fontSize: 16,
    color: '#999'
  }
});

export default SdkComponentDemo;
