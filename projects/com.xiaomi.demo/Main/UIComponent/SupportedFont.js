'use strict';

import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';

import {
  FontMiSansWLight,
  FontMiSansWRegular,
  FontMiSansWMedium,
  FontMiSansWDemibold,
  FontMiSansWHeavy,
  FontMILanProRegular, 
  FontMILanProNormal,
  FontMILanProMedium
} from 'miot/utils/fonts';

class SupportedFont extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let fontsArray = [
      {
        name: 'MiSansWLight',
        fontFamily: FontMiSansWLight
      },
      {
        name: 'MiSansWRegular',
        fontFamily: FontMiSansWRegular
      },
      {
        name: 'MiSansWMedium',
        fontFamily: FontMiSansWMedium
      },
      {
        name: 'MiSansWDemibold',
        fontFamily: FontMiSansWDemibold
      },
      {
        name: 'MiSansWHeavy',
        fontFamily: FontMiSansWHeavy
      },
      {
        name: 'MILanProRegular',
        fontFamily: FontMILanProRegular
      },
      {
        name: 'MILanProNormal',
        fontFamily: FontMILanProNormal
      },
      {
        name: 'MILanProMedium',
        fontFamily: FontMILanProMedium
      }
    ];

    let index = 0;
    let components = fontsArray.reduce((pre, { name, fontFamily }) => {
      index++;
      pre.push(<Text
        key={`${ index }-1`}
        style={{
          height: 44,
          paddingTop: 20,
          fontSize: 16,
          color: '#333',
          textAlign: 'left'
        }}
      >{name}</Text>);
      pre.push(<Text
        key={`${ index }-2`}
        style={{
          fontFamily: fontFamily,
          fontSize: 25,
          color: '#000',
          textAlign: 'center'
        }}
      >{name}</Text>);
      pre.push(<View
        key={`${ index }-3`}
        style={{
          marginTop: 5,
          backgroundColor: 'rgba(0, 0, 0, 0.12)',
          height: 1,
          width: '90%' 
        }}
      ></View>);
      return pre;
    }, []);

    let des = "建议使用 import {xx} from 'miot/utils/fonts'方式使用字体";
    return (
      <ScrollView
        style={{
          backgroundColor: '#FFFFFF',
          paddingTop: 30,
          paddingHorizontal: 15
        }}
      >
        <Text
          style={{
            paddingBottom: 30,
            fontSize: 15,
            color: '#333',
            textAlign: 'left'
          }}
        >{des}</Text>
        <Text
          style={{
            fontSize: 15,
            color: '#333',
            textAlign: 'left'
          }}
        >{"SDK 10079新增的字体如下"}</Text>
        {components}
        <View
          style={{
            marginTop: 5,
            height: 100,
            width: '100%' 
          }}
        ></View>
      </ScrollView>
    );
  }
}

export default SupportedFont;