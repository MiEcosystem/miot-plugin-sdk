'use strict';

import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { PopButton } from "miot/ui/hyperOSUI";
import theme from "miot/ui/Style/Themes/themeMiHome";
import { colorToken } from "mhui-rn/dist/styles/color";
import { dynamicStyleSheet } from "miot/ui";
import withDarkModeSupport from "../adaptiveThemeComponent";

class ButtonPageViewDemo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <PopButton
          size="large"
          type="primary"
          title={ "切换多语言" }
        >
        </PopButton>
      </ScrollView>
    );
  }
}

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.mj_color_gray_bg_2
  }
});

export default withDarkModeSupport(ButtonPageViewDemo);
