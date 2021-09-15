import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ListItemWithSlider from 'mhui-rn/dist/components/listItem/ListItemWithSlider';
import { Service, Device } from 'miot';

export default class Configurable extends Component {
  static propTypes = {
    miid: PropTypes.number,
    siid: PropTypes.number,
    iid: PropTypes.number,
    description: PropTypes.string,
    ['value-range']: PropTypes.array,
    access: PropTypes.array
  };

  state = {
    minimum_report_interval: 0,
    maximum_report_interval: 100,
    reportable_change: 5
  };

  setReportConfig = (cfg) => {
    const { miid, siid, iid } = this.props;
    const { minimum_report_interval, maximum_report_interval, reportable_change } = this.state;
    Service.spec.setPropertyReportConfig({
      did: Device.deviceID,
      miid,
      siid,
      piid: iid,
      minimum_report_interval,
      maximum_report_interval,
      reportable_change,
      ...cfg
    }).then((res) => {
      console.log('setReportConfig:success', res);
      this.setState(cfg);
    }).catch((e) => {
      console.log('setReportConfig:fail', e);
      this.forceUpdate();
    });
  }

  getReportConfig = () => {
    const { miid, siid, iid } = this.props;
    if (!this.supportReportConfig()) {
      return;
    }
    Service.spec.getPropertyReportConfig({
      did: Device.deviceID,
      miid,
      siid,
      piid: iid
    }).then((res) => {
      const { code, minimum_report_interval, maximum_report_interval, reportable_change } = res;
      if (code) {
        console.log('getReportConfig:fail,code=', code, res);
        return;
      }
      console.log('getReportConfig:success', res);
      this.setState({
        minimum_report_interval,
        maximum_report_interval,
        reportable_change
      });
    }).catch((e) => {
      console.log('getReportConfig:fail', e);
    });
  }

  supportReportConfig = () => {
    const { miid, access } = this.props;
    const valueRange = this.props['value-range'];
    if (!miid || !valueRange || !valueRange.length || !access || !access.includes('notify')) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    this.getReportConfig();
  }

  render() {
    const { siid, iid, description } = this.props;
    const { minimum_report_interval, maximum_report_interval, reportable_change } = this.state;
    const valueRange = this.props['value-range'];
    if (!this.supportReportConfig()) {
      return null;
    }
    return (
      <Fragment>
        <ListItemWithSlider
          title={`${ description } / min-report / ${ siid }:${ iid }`}
          showWithPercent={false}
          sliderProps={{
            minimumValue: 0,
            maximumValue: 100,
            step: 1,
            value: minimum_report_interval
          }}
          onSlidingComplete={(value) => {
            this.setReportConfig({
              minimum_report_interval: value
            });
          }}
        />
        <ListItemWithSlider
          title={`${ description } / max-report / ${ siid }:${ iid }`}
          showWithPercent={false}
          sliderProps={{
            minimumValue: 0,
            maximumValue: 100,
            step: 1,
            value: maximum_report_interval
          }}
          onSlidingComplete={(value) => {
            this.setReportConfig({
              maximum_report_interval: value
            });
          }}
        />
        <ListItemWithSlider
          title={`${ description } / change-report / ${ siid }:${ iid }`}
          showWithPercent={false}
          sliderProps={{
            minimumValue: valueRange[0],
            maximumValue: valueRange[1],
            step: valueRange[2],
            value: reportable_change
          }}
          onSlidingComplete={(value) => {
            this.setReportConfig({
              reportable_change: value
            });
          }}
        />
      </Fragment>
    );
  }
}
