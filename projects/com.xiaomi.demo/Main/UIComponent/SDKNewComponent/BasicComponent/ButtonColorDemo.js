import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Button } from 'miot/ui/hyperOSUI/index';
import { colorToken } from "miot/ui/hyperOSUI";
import { dynamicStyleSheet } from "miot/ui";
import NavigationBar from "miot/ui/NavigationBar";

const colors = ['green', 'blue', 'orange', 'wathet', 'purple'];
const lightColors = colors;
class ButtonColorDemo extends Component {
  constructor(props) {
    super(props);
    let disabled = false;
    this.state = {
      disabled,
    };
    this.props.navigation.setParams({
      right: [
        {
          key: NavigationBar.ICON.MORE,
          onPress: () => {
            this.setState((prev) => ({
              disabled: !prev.disabled,
            }));
          },
        },
      ],
    });
  }

  renderButtons(size, type, title, colorList = colors) {
    return colorList.map((color) => (
      <View key={`${ size }-${ type }-${ color }`} style={{ marginTop: 12 }}>
        <Button
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
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

        <View style={styles.group}>
          {/* primary: large / medium / small */}
          <View style={styles.column}>
            {this.renderButtons('large', 'primary', '切换多语言')}
          </View>
          <View style={styles.column}>
            {this.renderButtons('medium', 'primary', '普通')}
          </View>
          <View>
            {this.renderButtons('small', 'primary', '普通')}
          </View>
        </View>

        <View style={styles.group}>
          {/* primarySubtle: large / medium / small */}
          <View style={styles.column}>
            {this.renderButtons('large', 'primarySubtle', '切换多语言')}
          </View>
          <View style={styles.column}>
            {this.renderButtons('medium', 'primarySubtle', '普通')}
          </View>
          <View>
            {this.renderButtons('small', 'primarySubtle', '普通')}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = dynamicStyleSheet({
  container: {
    backgroundColor: colorToken.surfacePageLow,
  },
  group: {
    marginTop: 48,
    flexDirection: 'row',
    marginHorizontal: 36,
  },
  column: {
    marginRight: 52,
  },
});

export default ButtonColorDemo;
