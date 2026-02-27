import React from 'react';
import {View} from 'react-native';
import { Buttons } from 'miot/ui/hyperOSUI';
import { colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui';

class FixedDrawerDemo extends React.Component {
  constructor(props) {
    super(props);
  }
  renderButtons() {
    return [
      { title: '满屏' },
      { title: '70%' }
    ];
  }

  render() {
    const buttons = this.renderButtons();
    return (
      <View style={styles.container}>
        <Buttons
          buttons={buttons}
        />
      </View>
    );
  }
}

const styles = dynamicStyleSheet({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colorToken.mj_color_gray_bg_2
  }
});

export default FixedDrawerDemo;
