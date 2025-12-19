'use strict';

import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { PopButton } from "miot/ui/hyperOSUI/index";
import theme from "miot/ui/Style/Themes/themeMiHome";

class ButtonCustomDemo extends Component {
  constructor(props) {
    super(props);
    let multilingual = false;
    let disabled = false;
    this.state = {
      multilingual,
      disabled
    };
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <PopButton
          size="large"
          type="primary"
          title={ this.state.multilingual ? "切换多语言切换多语言切换多语言切换多语言" : "切换多语言" }
          disabled={this.state.disabled}
          onPress={() => {
            this.setState((prev) => ({
              multilingual: !prev.multilingual
            }));
          }}
        >
        </PopButton>
        <View style={{ marginTop: 12 }}/>
        <PopButton
          size="large"
          type="normal"
          title={ this.state.multilingual ? "切换禁用态切换禁用态切换禁用态切换禁用态" : "切换禁用态" }
          disabled={false}
          onPress={() => {
            this.setState((prev) => ({
              disabled: !prev.disabled
            }));
          }}
        >
        </PopButton>
        <View style={ { marginTop: 12 } }/>
        <PopButton
          size="large"
          type="warning"
          title={ this.state.multilingual ? "文字文字文字文字文字文字文字文字文字" : "文字" }
          disabled={this.state.disabled}
        >
        </PopButton>
        <View style={ { marginTop: 48 } }/>
        <PopButton
          size="medium"
          type="light"
          colorType="green"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </PopButton>
        <View style={ { marginTop: 12 } }/>
        <PopButton
          size="medium"
          type="primary"
          colorType="green"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </PopButton>
        <View style={ { marginTop: 12 } }/>
        <PopButton
          size="medium"
          type="warning"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </PopButton>
        <View style={ { marginTop: 12 } }/>
        <PopButton
          size="medium"
          type="normal"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </PopButton>
        <View style={ { marginTop: 12 } }/>
        <PopButton
          size="medium"
          type="primary"
          colorType="white"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </PopButton>
        <View style={ { marginTop: 48 } }/>
        <PopButton
          size="small"
          type="normal"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </PopButton>
        <View style={ { marginTop: 12 } }/>
        <PopButton
          size="small"
          type="primary"
          colorType="green"
          title={ this.state.multilingual ? "普通普通普通普通普通普通普通普通" : "普通" }
          disabled={this.state.disabled}
        >
        </PopButton>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.mjColorGrayBg2
  }
});

export default ButtonCustomDemo;
