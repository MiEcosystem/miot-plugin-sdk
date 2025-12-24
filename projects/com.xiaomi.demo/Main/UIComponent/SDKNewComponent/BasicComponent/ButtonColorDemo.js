import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { PopButton } from 'miot/ui/hyperOSUI/index';
import theme from 'miot/ui/Style/Themes/themeMiHome';
import withDarkModeSupport from "../adaptiveThemeComponent";
import { colorToken } from "miot/ui/hyperOSUI";
import { dynamicStyleSheet } from "miot/ui";

const colors = ['green', 'blue', 'yellow', 'orange', 'wathet', 'purple', 'red'];
const lightColors = colors.filter((c) => c !== 'red');
class ButtonColorDemo extends Component {
  state = {
    disabled: false
  };

  renderButtons(size, type, title, colorList = colors) {
    return colorList.map((color) => (
      <View key={`${ size }-${ type }-${ color }`} style={{ marginTop: 12 }}>
        <PopButton
          size={size}
          type={type}
          colorType={color}
          title={title}
          disabled={this.state.disabled}
        />
      </View>
    ));
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* large / primary */}
        {this.renderButtons('large', 'primary', '切换多语言')}

        <View style={styles.group}>
          {/* medium / light */}
          <View style={styles.column}>
            {this.renderButtons('medium', 'light', '普通', lightColors)}
          </View>

          {/* medium / primary */}
          <View style={styles.column}>
            {this.renderButtons('medium', 'primary', '普通')}
          </View>

          {/* small / primary */}
          <View>
            {this.renderButtons('small', 'primary', '普通')}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.mj_color_gray_bg_2
  },
  group: {
    marginTop: 48,
    flexDirection: 'row',
    marginHorizontal: 36
  },
  column: {
    marginRight: 52
  }
});

export default withDarkModeSupport(ButtonColorDemo);
