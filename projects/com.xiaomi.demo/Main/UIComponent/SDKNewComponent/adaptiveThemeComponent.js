import React from 'react';
import { DarkMode } from 'miot';

/**
 * 高阶组件 - 深色模式支持
 * 
 * 自动处理插件深色模式的生命周期：
 * - UNSAFE_componentWillMount: 启用插件自有的深色模式
 * - componentWillUnmount: 关闭插件自有的深色模式
 * 
 * 使用方法：
 * 
 * 1. 包裹类组件：
 * const EnhancedComponent = withDarkModeSupport(MyComponent);
 * 
 * 2. 包裹函数组件：
 * const EnhancedComponent = withDarkModeSupport((props) => {
 *   // 你的组件逻辑
 * });
 * 
 * 3. 直接使用：
 * export default withDarkModeSupport(MyComponent);
 */

// 类组件版本的高阶组件
function withDarkModeSupportClass(WrappedComponent) {
  return class extends React.Component {
    static displayName = `withDarkModeSupport(${ WrappedComponent.displayName || WrappedComponent.name || 'Component' })`;

    UNSAFE_componentWillMount() {
      // 关闭插件所在页面native端的系统强制深色模式（Android）/miot-sdk的反色模式（iOS）,
      // 由开发者使用框架提供的接口自己适配插件的深色模式
      DarkMode.preparePluginOwnDarkMode();
    }

    componentWillUnmount() {
      DarkMode.closePluginOwnDarkMode();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

// 函数组件版本的高阶组件
function withDarkModeSupportFunctional(WrappedComponent) {
  const WrappedComponentWithDarkMode = (props) => {
    React.useLayoutEffect(() => {
      // 组件挂载时启用插件自有的深色模式
      DarkMode.preparePluginOwnDarkMode();

      // 组件卸载时关闭插件自有的深色模式
      return () => {
        DarkMode.closePluginOwnDarkMode();
      };
    }, []); // 空依赖数组，只在挂载和卸载时执行

    return <WrappedComponent {...props} />;
  };

  WrappedComponentWithDarkMode.displayName = `withDarkModeSupport(${ WrappedComponent.displayName || WrappedComponent.name || 'Component' })`;

  return WrappedComponentWithDarkMode;
}

// 统一的高阶组件（自动判断组件类型）
function withDarkModeSupport(WrappedComponent) {
  // 判断是否是类组件
  const isClassComponent = 
    typeof WrappedComponent === 'function' &&
    WrappedComponent.prototype &&
    WrappedComponent.prototype.isReactComponent;

  if (isClassComponent) {
    return withDarkModeSupportClass(WrappedComponent);
  } else {
    return withDarkModeSupportFunctional(WrappedComponent);
  }
}

// 也可以使用 Hooks 版本（直接在组件中使用）
export function useDarkModeSupport() {
  React.useLayoutEffect(() => {
    // 组件挂载时启用插件自有的深色模式
    DarkMode.preparePluginOwnDarkMode();

    // 组件卸载时关闭插件自有的深色模式
    return () => {
      DarkMode.closePluginOwnDarkMode();
    };
  }, []);
}

// 不使用反色模式的入口路由
export const darkModeDemoPathList = ['SdkComponentDemo', 'DarkModeDemo'];

export default withDarkModeSupport;
