import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { listen, setSpecValue, triggerSpecAction } from '../spec-helper';

import ListItemWithSwitch from 'mhui-rn/dist/components/listItem/ListItemWithSwitch';
import ListItemWithSlider from 'mhui-rn/dist/components/listItem/ListItemWithSlider';
import ListItem from 'mhui-rn/dist/components/listItem/ListItem';
import CardButton from 'mhui-rn/dist/modules/cardButton/CardButton';
import SelectorWithButton from 'mhui-rn/dist/modules/selectorWithButton/SelectorWithButton';

const IconSwitch = require('mhui-rn/dist/modules/resources/images/switch.png');
const Icons = [
  require('mhui-rn/dist/modules/resources/images/level1.png'),
  require('mhui-rn/dist/modules/resources/images/level2.png'),
  require('mhui-rn/dist/modules/resources/images/level3.png'),
  require('mhui-rn/dist/modules/resources/images/level4.png'),
  require('mhui-rn/dist/modules/resources/images/level5.png')
];
const IconsSelected = [
  require('mhui-rn/dist/modules/resources/images/level1-selected.png'),
  require('mhui-rn/dist/modules/resources/images/level2-selected.png'),
  require('mhui-rn/dist/modules/resources/images/level3-selected.png'),
  require('mhui-rn/dist/modules/resources/images/level4-selected.png'),
  require('mhui-rn/dist/modules/resources/images/level5-selected.png')
];

function getUIComponentAndBasicProps(spec) {
  const { description, format, access, iid, eiid, aiid } = spec;
  const title = `${ description } / ${ eiid ? 'eiid' : aiid ? 'aiid' : 'piid' }:${ iid }`;
  const disabled = !(access || []).includes('write') && !aiid;
  switch (true) {
    case !!aiid:
      return {
        state: {
          UIComponent: CardButton,
          title,
          disabled,
          hasShadow: false,
          icon: IconSwitch,
          onPress: () => {
            triggerSpecAction(spec);
          }
        }
      };
    case format === 'bool':
      return {
        updateUi(value = false) {
          this.setState({
            value
          });
        },
        state: {
          UIComponent: ListItemWithSwitch,
          title,
          disabled,
          value: false,
          onValueChange: (value) => {
            setSpecValue(spec, value);
          }
        }
      };
    case spec['value-list'] instanceof Array:
      return {
        updateUi(value = 0) {
          this.setState({
            initSelectedIndexs: [spec['value-list'].findIndex(({ value: v }) => {
              return value === v;
            })]
          });
        },
        state: {
          UIComponent: SelectorWithButton,
          title,
          disabled,
          hasShadow: false,
          items: spec['value-list'].map(({ description }, index) => {
            return {
              icon: Icons[index] || 0,
              iconSelected: IconsSelected[index] || 0,
              title: description
            };
          }),
          onSelected: (index) => {
            setSpecValue(spec, spec['value-list'][index].value);
          }
        }
      };
    case spec['value-range'] instanceof Array:
      return {
        updateUi(value = 0) {
          this.setState({
            sliderProps: {
              minimumValue: spec['value-range'][0],
              maximumValue: spec['value-range'][1],
              step: spec['value-range'][2],
              value: value
            }
          });
        },
        state: {
          UIComponent: ListItemWithSlider,
          title,
          disabled,
          showWithPercent: false,
          sliderProps: {
            minimumValue: spec['value-range'][0],
            maximumValue: spec['value-range'][1],
            step: spec['value-range'][2],
            value: spec['value-range'][0]
          },
          onSlidingComplete: (value) => {
            setSpecValue(spec, value);
          }
        }
      };
    default:
      return {
        updateUi(value = '-') {
          this.setState({
            value: String(value)
          });
        },
        state: {
          UIComponent: ListItem,
          title,
          value: '-',
          hideArrow: true
        }
      };
  }
}

export default class ContainerController extends Component {
  static propTypes = {
    miid: PropTypes.any,
    siid: PropTypes.any,
    iid: PropTypes.any,
    type: PropTypes.string,
    name: PropTypes.string,
    format: PropTypes.string,
    access: PropTypes.array,
    unit: PropTypes.string,
    ['value-list']: PropTypes.array,
    ['value-range']: PropTypes.array
  };
  constructor(props, context) {
    super(props);
    const { updateUi = (...rest) => {
      console.log(...rest);
    }, state = {} } = getUIComponentAndBasicProps(props, context);
    this.state = state;
    this.updateUi = updateUi.bind(this);
  }
  listeners = [];
  value = null;
  update = (v) => {
    this.updateUi && this.updateUi(v);
  }
  watch() {
    listen(this.props, this.update);
  }
  unwatch() {
    while (this.listeners.length) {
      let listener = this.listeners.pop();
      listener && listener.remove();
    }
  }
  componentDidMount() {
    this.update();
    this.watch();
  }
  componentWillUnmount() {
    this.unwatch();
  }
  render() {
    const { UIComponent, ...rest } = this.state;
    return UIComponent ? (
      <UIComponent {...rest} />
    ) : null;
  }
}
