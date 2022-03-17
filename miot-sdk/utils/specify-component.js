import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { listen, getSpecKey } from './data-manager';
export default function specifyComponent(UIComponent, adapter) {
  if (!UIComponent) {
    return null;
  }
  return class TargetComponent extends Component {
    static propTypes = {
      specs: PropTypes.array,
      defaultValues: PropTypes.array
    };
    constructor(props) {
      super(props);
      const { specs = [], defaultValues } = props;
      this.state = {};
      this.listeners = [];
      this.values = defaultValues ? [...defaultValues] : specs.map(() => undefined);
      Object.entries(adapter || []).forEach(([k, v]) => {
        this[k] = v;
      });
    }
    componentDidMount() {
      if (this.onMounted instanceof Function) {
        this.onMounted();
      }
      this.watch();
    }
    componentWillUnmount() {
      if (this.onUnmount instanceof Function) {
        this.onUnmount();
      }
      this.unwatch();
      this.setState = () => {
        return;
      };
    }
    listenSpecs(specs = [], values = [], fn, defaultValues = []) {
      function f(v) {
        const { value } = v || {};
        const key = getSpecKey(v);
        const index = specs.findIndex((spec) => getSpecKey(spec) === key);
        if (index >= 0 && values[index] !== value) {
          values[index] = value === undefined || value === null ? defaultValues[index] : value;
          fn(v);
        }
      }
      specs.forEach((spec) => {
        listen(spec, f);
      });
    }
    watch() {
      const { specs = [], defaultValues = [] } = this.props;
      if (this.handle instanceof Function) {
        this.handle({});
        this.listenSpecs(specs, this.values, this.handle.bind(this), defaultValues);
      }
    }
    unwatch() {
      while (this.listeners.length) {
        const listener = this.listeners.pop();
        listener && listener.remove && listener.remove();
      }
    }
    render() {
      const { hidden, ...rest } = this.state;
      if (hidden) {
        return null;
      }
      return (
        <UIComponent {...rest}>
          {this.props.children}
        </UIComponent>
      );
    }
  };
}