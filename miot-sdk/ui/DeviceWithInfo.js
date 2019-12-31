import React, {PureComponent} from 'react';
import {StyleSheet, View, Text, Image, ART} from 'react-native';
import PropTypes from 'prop-types';
import {fixHex} from '../utils/colors';
import {adjustSize} from '../utils/sizes';
import {FontDefault} from '../utils/fonts';
import {NOOP} from '../utils/fns';
const {Surface, Group, Shape, Path, Transform} = ART;
const PI = Math.PI;
export default class DeviceWithInfo extends PureComponent {
  static propTypes = {
    icon: PropTypes.any,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    holdPlace: PropTypes.bool,
    progress: PropTypes.number,
    themeColor: PropTypes.any
  };
  render() {
    let {icon, title, subtitle, holdPlace, progress, themeColor} = this.props;
    if(!progress) {
      progress = 0;
    }
    progress = Math.min(1, Math.max(0, progress));
    let r = adjustSize(648 / 2);
    let rDot = adjustSize(15 / 2);
    let startX = r + Math.cos(-0.5 * PI) * r;
    let startY = r + Math.sin(-0.5 * PI) * r;
    let halfX = r + Math.cos(0.5 * PI) * r;
    let halfY = r + Math.sin(0.5 * PI) * r;
    let endX = r + Math.cos(progress * 2 * PI - 0.5 * PI) * r;
    let endY = r + Math.sin(progress * 2 * PI - 0.5 * PI) * r;
    let PathCircleBase = new Path()
      .moveTo(startX, startY)
      .arcTo(halfX, halfY, r, r, false, false)
      .arcTo(startX, startY, r, r, false, false);
    let PathCircle = new Path()
      .moveTo(startX, startY);
    if(progress >= 0.5) {
      PathCircle.arcTo(halfX, halfY, r, r, false, false);
    }
    PathCircle.arcTo(endX, endY, r, r, false, false);
    let PathDot = new Path()
      .moveTo(endX, endY - rDot)
      .arcTo(endX, endY + rDot, rDot, rDot, false, false)
      .arcTo(endX, endY - rDot, rDot, rDot, false, false);
    return (
      <View style={Styles.container}>
        <View style={Styles.deviceContainer}>
            <Surface width={r * 2} height={r * 2} style={{
              position: 'absolute',
              left: 0,
              top: adjustSize(15 / 2)
            }}>
              <Shape d={PathCircleBase} strokeWidth={1} stroke={themeColor ? (fixHex(themeColor) + '33').slice(0, 9) : '#33ABF233'} />
              {progress > 0 ? (
                <Group>
                  <Shape d={PathCircle} strokeWidth={1} stroke={themeColor || '#33ABF2'} />
                  <Shape d={PathDot} strokeWidth={1} fill={themeColor || '#33ABF2'} />
                </Group>
              ) : null}
            </Surface>
          <View style={[Styles.deviceInner, themeColor ? {
            backgroundColor: themeColor
          } : null]}>
            <Image style={Styles.deviceIcon} source={icon} />
          </View>
        </View>
        <View style={Styles.infoContainer}>
          <Text style={Styles.infoTitle}>{title || (holdPlace ? ' ' : '')}</Text>
          <Text style={Styles.infoSubtitle}>{subtitle || (holdPlace ? ' ' : '')}</Text>
        </View>
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: adjustSize(300)
  },
  deviceContainer: {
    width: adjustSize(663),
    height: adjustSize(663),
    justifyContent: 'center',
    alignItems: 'center'
  },
  deviceInner: {
    width: adjustSize(558),
    height: adjustSize(558),
    borderRadius: adjustSize(279),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#43C2FA'
  },
  deviceIcon: {
    width: adjustSize(264),
    height: adjustSize(228)
  },
  infoContainer: {
    marginTop: adjustSize(33),
    alignItems: 'center'
  },
  infoTitle: {
    fontFamily: FontDefault,
    fontSize: adjustSize(45),
    lineHeight: adjustSize(60),
    color: '#000'
  },
  infoSubtitle: {
    marginTop: adjustSize(9),
    fontFamily: FontDefault,
    fontSize: adjustSize(36),
    lineHeight: adjustSize(48),
    color: '#B2B2B2'
  }
});