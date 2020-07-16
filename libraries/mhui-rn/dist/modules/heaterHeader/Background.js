// @ts-nocheck

/* eslint-disable */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { adjustSize } from "../utils/sizes";
import { createDot } from "./Dot";
import { Icons } from "../utils/Icons";
const Dot0 = createDot(26, 28, Icons.heaterDot0);
const Dot1 = createDot(4, 4, Icons.heaterDot1);
const Dot2 = createDot(3, 3, Icons.heaterDot2);
const Dot3 = createDot(16, 16, Icons.heaterDot3);
const Dot4 = createDot(8, 8, Icons.heaterDot4);
const Dot5 = createDot(22, 22, Icons.heaterDot5);
const Dot6 = createDot(83, 83, Icons.heaterDot6);
export default class Background extends Component {
  static defaultProps = {
    on: false,
    themeColor: null
  };

  getDots() {
    const {
      themeColor
    } = this.props;
    const dots = [];
    const Dots = [Dot0, Dot1, Dot2, Dot3, Dot4, Dot5, Dot6].reverse();
    const dotCount = [14, 11, 18, 10, 11, 10, 11].reverse();
    dotCount.forEach((c, index) => {
      const DotN = Dots[index];

      for (let i = 0; i < c; i++) {
        dots.push(<DotN key={String(index) + String(i)} />);
      }
    });
    return dots;
  }

  render() {
    const {
      on
    } = this.props;

    if (!on) {
      return null;
    }

    const dots = this.getDots();
    return <View style={StylesBackground.container}>
        {dots}
      </View>;
  }

}
const StylesBackground = StyleSheet.create({
  container: {
    height: adjustSize(1263)
  }
});