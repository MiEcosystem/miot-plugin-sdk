'use strict';

import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

import Fonts from 'miot/utils/fonts';
import { colorToken } from "miot/ui/hyperOSUI";
import { dynamicStyleSheet } from "miot/ui";
import withDarkModeSupport from "../adaptiveThemeComponent";

class SupportedFont extends Component {
  renderText(label, fontStyle) {
    return (
      <Text
        style={[
          styles.demoText,
          fontStyle
        ]}
      >
        {label}
      </Text>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* 大标题 */}
        <Text style={styles.sectionLabel}>大标题</Text>
        {this.renderText('mjTextTitle1R', Fonts.mjTextTitle1R)}
        {this.renderText('mjTextTitle2M', Fonts.mjTextTitle2M)}
        {this.renderText('mjTextTitle3M', Fonts.mjTextTitle3M)}
        {this.renderText('mjTextTitle3R', Fonts.mjTextTitle3R)}
        {this.renderText('mjTextTitle4M', Fonts.mjTextTitle4M)}

        {/* 子标题 */}
        <Text style={styles.sectionLabel}>子标题</Text>
        {this.renderText('mjTextSubtitle1M', Fonts.mjTextSubtitle1M)}
        {this.renderText('mjTextSubtitle2M', Fonts.mjTextSubtitle2M)}
        {this.renderText('mjTextSubtitle3M', Fonts.mjTextSubtitle3M)}
        {this.renderText('mjTextSubtitle3R', Fonts.mjTextSubtitle3R)}
        {this.renderText('mjTextSubtitle4M', Fonts.mjTextSubtitle4M)}


        {/* 按钮 */}
        <Text style={styles.sectionLabel}>按钮</Text>
        <Text style={[styles.demoText, Fonts.mjTextButton1M]}>mjTextButton1M</Text>
        <Text style={[styles.demoText, Fonts.mjTextButton2M]}>mjTextButton2M</Text>
        <Text style={[styles.demoText, Fonts.mjTextButton3R]}>mjTextButton3R</Text>
        <Text style={[styles.demoText, Fonts.mjTextButton4R]}>mjTextButton4R</Text>

        {/* 主标题 */}
        <Text style={styles.sectionLabel}>主标题</Text>
        <Text style={[styles.demoText, Fonts.mjTextHeadline1M]}>mjTextHeadline1M</Text>
        <Text style={[styles.demoText, Fonts.mjTextHeadline1R]}>mjTextHeadline1R</Text>
        <Text style={[styles.demoText, Fonts.mjTextHeadline2M]}>mjTextHeadline2M</Text>

        {/* 正文 */}
        <Text style={styles.sectionLabel}>正文</Text>
        <Text style={[styles.demoText, Fonts.mjTextBody1R]}>mjTextBody1R</Text>
        <Text style={[styles.demoText, Fonts.mjTextBody2R]}>mjTextBody2R</Text>

        {/* 注释 */}
        <Text style={styles.sectionLabel}>注释</Text>
        <Text style={[styles.demoText, Fonts.mjTextFootnote1R]}>mjTextFootnote1R</Text>
        <Text style={[styles.demoText, Fonts.mjTextFootnote2R]}>mjTextFootnote2R</Text>
        <Text style={[styles.demoText, Fonts.mjTextFootnote3R]}>mjTextFootnote3R</Text>
        <Text style={[styles.demoText, Fonts.mjTextFootnote4R]}>mjTextFootnote4R</Text>
        <Text style={[styles.demoText, Fonts.mjTextFootnote5R]}>mjTextFootnote5R</Text>

        {/* 自定义 */}
        <Text style={styles.sectionLabel}>自定义</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom32M]}>mjTextCustom32M</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom24M]}>mjTextCustom24M</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom20M]}>mjTextCustom20M</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom20R]}>mjTextCustom20R</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom18M]}>mjTextCustom18M</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom18R]}>mjTextCustom18R</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom16M]}>mjTextCustom16M</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom16R]}>mjTextCustom16R</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom15M]}>mjTextCustom15M</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom15R]}>mjTextCustom15R</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom14M]}>mjTextCustom14M</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom14R]}>mjTextCustom14R</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom13M]}>mjTextCustom13M</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom13R]}>mjTextCustom13R</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom12M]}>mjTextCustom12M</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom12R]}>mjTextCustom12R</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom11M]}>mjTextCustom11M</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom11R]}>mjTextCustom11R</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom10M]}>mjTextCustom10M</Text>
        <Text style={[styles.demoText, Fonts.mjTextCustom10R]}>mjTextCustom10R</Text>
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

export default withDarkModeSupport(SupportedFont);
