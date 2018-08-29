// MHCircularSlider.js
import PropTypes from 'prop-types'
import  React ,{findNodeHandle} from 'react'

import { 
requireNativeComponent,
Platform,
DeviceEventEmitter,

} from 'react-native'

if (Platform.OS === 'ios') {
  var MHWrapperCircularSlider = requireNativeComponent('MHWrapperCircularSlider');
  var MHCircularSliderConsts = MHWrapperCircularSlider.Constants;
  var MHCircularSliderViewManager = require('NativeModules').MHWrapperCircularSlider;
}

export default class MHCircularSlider extends React.Component {
  constructor(props) {
    super(props);
    this.consts = MHCircularSliderConsts;
  }

  setValue(newValue) {
    this._slider.setNativeProps({value:newValue});
  }

  getValueWithCallback(callback) {
    if(Platform.OS === 'ios') MHCircularSliderViewManager.getValueWithCallback(findNodeHandle(this), callback);
  }

  //设置开关
  setPower(power, value) {
    if(Platform.OS === 'ios') MHCircularSliderViewManager.setPower(findNodeHandle(this), power, value);
  }

  render() {
    if(Platform.OS === 'ios'){
      return <MHWrapperCircularSlider ref={component => {this._slider = component;}} {...this.props} />;
    } else {
      return <View></View>
    }
   }
}

MHCircularSlider.propTypes = {
  value: PropTypes.number,
  minimumValue: PropTypes.number,
  maximumValue: PropTypes.number,
  sliderName: PropTypes.string,
};

