var React = require('react-native');
var {
  requireNativeComponent,
  DeviceEventEmitter,
} = React;

// requireNativeComponent 自动把这个组件提供给 "MHDataPickerManager"
var RCTDataPicker = requireNativeComponent('MHDataPicker');

class DataPicker extends React.Component {
  componentWillMount() {
    DeviceEventEmitter.addListener('kDataPickerDidPickData', (data) => {
      if (this.props.onPickData) {
        this.props.onPickData(data);
      }
    });
  }

  render() {
    return <RCTDataPicker {...this.props} />;
  }

}

DataPicker.propTypes = {
  minValue: React.PropTypes.number,
  maxValue: React.PropTypes.number,
  interval: React.PropTypes.number,
  defaultValue: React.PropTypes.number,
  unit: React.PropTypes.string,
  valueFormat: React.PropTypes.string,
  onPickData: React.PropTypes.func,
};

module.exports = DataPicker;
