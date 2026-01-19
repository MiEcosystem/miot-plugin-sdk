'use strict';

import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { colorToken, Fonts } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';

const FONT_SECTIONS = [
  {
    title: '大标题',
    items: [
      'mj_text_title_1_R',
      'mj_text_title_2_M',
      'mj_text_title_3_M',
      'mj_text_title_3_R',
      'mj_text_title_4_M'
    ]
  },
  {
    title: '子标题',
    items: [
      'mj_text_subtitle_1_M',
      'mj_text_subtitle_2_M',
      'mj_text_subtitle_3_M',
      'mj_text_subtitle_3_R',
      'mj_text_subtitle_4_M'
    ]
  },
  {
    title: '按钮',
    items: [
      'mj_text_button_1_M',
      'mj_text_button_2_M',
      'mj_text_button_3_R',
      'mj_text_button_4_R'
    ]
  },
  {
    title: '主标题',
    items: [
      'mj_text_headline_1_M',
      'mj_text_headline_1_R',
      'mj_text_headline_2_M'
    ]
  },
  {
    title: '正文',
    items: [
      'mj_text_body_1_R',
      'mj_text_body_2_R'
    ]
  },
  {
    title: '注释',
    items: [
      'mj_text_footnote_1_R',
      'mj_text_footnote_2_R',
      'mj_text_footnote_3_R',
      'mj_text_footnote_4_R',
      'mj_text_footnote_5_R'
    ]
  },
  {
    title: '自定义',
    items: [
      'mj_text_custom_32_M',
      'mj_text_custom_24_M',
      'mj_text_custom_20_M',
      'mj_text_custom_20_R',
      'mj_text_custom_18_M',
      'mj_text_custom_18_R',
      'mj_text_custom_16_M',
      'mj_text_custom_16_R',
      'mj_text_custom_15_M',
      'mj_text_custom_15_R',
      'mj_text_custom_14_M',
      'mj_text_custom_14_R',
      'mj_text_custom_13_M',
      'mj_text_custom_13_R',
      'mj_text_custom_12_M',
      'mj_text_custom_12_R',
      'mj_text_custom_11_M',
      'mj_text_custom_11_R',
      'mj_text_custom_10_M',
      'mj_text_custom_10_R'
    ]
  }
];

class SupportedFont extends Component {
    renderText = (name) => (
      <Text key={name} style={[styles.demoText, Fonts[name]]}>
        {name}
      </Text>
    );

    renderSection = ({ title, items }) => (
      <View key={title}>
        <Text style={styles.sectionLabel}>{title}</Text>
        {items.map(this.renderText)}
      </View>
    );

    render() {
      return (
        <ScrollView style={styles.container}>
          {FONT_SECTIONS.map(this.renderSection)}
          <View style={{ height: 80 }} />
        </ScrollView>
      );
    }
}

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.mj_color_gray_bg_2,
    paddingTop: 30,
    paddingHorizontal: 20
  },
  sectionLabel: {
    fontSize: 14,
    color: colorToken.mjcard_color_miui_2,
    fontWeight: '600',
    marginTop: 28,
    marginBottom: 12
  },
  demoText: {
    color: colorToken.mj_color_gray_text_1,
    marginBottom: 8
  }
});

export default SupportedFont;
