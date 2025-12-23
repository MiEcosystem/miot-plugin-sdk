import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Switch, Checkbox, ChoiceItem } from 'miot/ui/hyperOSUI';
import withDarkModeSupport from '../adaptiveThemeComponent';
import { colorToken } from 'mhui-rn/dist/styles/color';
import { dynamicStyleSheet } from 'miot/ui';
import NavigationBar from "miot/ui/NavigationBar";

const colors = ['green', 'blue', 'yellow', 'orange', 'wathet', 'purple', 'red'];

class AtomicDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: false,
      disabled: false
    };
    this.props.navigation.setParams({
      right: [
        {
          key: NavigationBar.ICON.MORE,
          onPress: () => {
            this.setState((prev) => ({
              disabled: !prev.disabled
            }));
          }
        }
      ]
    });
  }

  renderSwitch(colorList = colors) {
    return colorList.map((color, index) => (
      <View key={color} style={{ marginTop: index === 0 ? 0 : 56 }}>
        <Switch
          colorType={color}
          value={this.state.value}
          disabled={this.state.disabled}
          onValueChange={() =>
            this.setState((prev) => ({ value: !prev.value }))
          }
        />
      </View>
    ));
  }

  renderCheckBox(colorList = colors) {
    return colorList.map((color, index) => (
      <View key={color} style={{ marginTop: index === 0 ? 0 : 56 }}>
        <Checkbox
          colorType={color}
          checked={this.state.value}
          disabled={this.state.disabled}
          onValueChange={() =>
            this.setState((prev) => ({ value: !prev.value }))
          }
        />
      </View>
    ));
  }
  renderChoiceItem1(colorList = colors) {
    return colorList.map((color, index) => (
      <View key={color} style={{ marginTop: index === 0 ? 0 : 56 }}>
        <ChoiceItem
          colorType={color}
          choosed={this.state.value}
          disabled={this.state.disabled}
          type={1}
          onValueChange={() =>
            this.setState((prev) => ({ value: !prev.value }))
          }
        />
      </View>
    ));
  }
  renderChoiceItem2(colorList = colors) {
    return colorList.map((color, index) => (
      <View key={color} style={{ marginTop: index === 0 ? 0 : 56 }}>
        <ChoiceItem
          colorType={color}
          choosed={this.state.value}
          disabled={this.state.disabled}
          type={2}
          onValueChange={() =>
            this.setState((prev) => ({ value: !prev.value }))
          }
        />
      </View>
    ));
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* Switch 列 */}
        <View style={styles.column}>
          {this.renderSwitch()}
        </View>

        {/* Checkbox 列 */}
        <View style={styles.column}>
          {this.renderCheckBox()}
        </View>
        <View style={styles.column}>
          {this.renderChoiceItem1()}
        </View>
        <View style={styles.column}>
          {this.renderChoiceItem2()}
        </View>

      </ScrollView>
    );
  }
}

const styles = dynamicStyleSheet({
  container: {
    flexDirection: 'row',
    backgroundColor: colorToken.mj_color_gray_bg_2,
    paddingHorizontal: 27
  },
  column: {
    marginRight: 27
  }
});

export default withDarkModeSupport(AtomicDemo);
