import React from "react";
import { BackHandler, View, Text } from "react-native";
import { AbstractDialog, Card } from 'mhui-rn';
import { Styles } from "miot/resources";

class BackHandlerDemo extends React.Component {
  constructor(props) {
    super(props);
    this.backHandler = null;
    this.state = {
      flag: false
    };
    this._onGoBack = this._onGoBack.bind(this);
  }

  _onGoBack() {
    // ... 自定义逻辑
    this.setState({ flag: true });
    // ... 自定义逻辑

    return true; // 返回true，可以阻止事件冒泡，使得原本的返回操作无效，即不会返回到上一级页面
    // return false; // 返回false，事件可继续传递，触发其他监听或是退出到上一级页面
  }

  componentDidMount() {
    // 随组件挂载后，添加返回监听器
    // 第一个参数固定，第二个参数为监听回调
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this._onGoBack);
  }

  componentWillUnmount() {
    // 重要！记得一定要随组件卸载移除返回监听，否则所有页面都会被监听！
    this.backHandler && this.backHandler.remove();
    
    // 另一种移除方式
    // BackHandler.removeEventListener('hardwareBackPress', this._onGoBack);
  }


  render() {
    return (
      <View>
        <View style={{ alignItems: 'center' }}>
          <Card text="试试不依靠导航栏返回(仅限安卓)" textStyle={{ fontSize: 18, color: Styles.common.MHGreen }} numberOfLines={2}></Card>
        </View>
        <AbstractDialog
          title="提示"
          useNewTheme
          visible={this.state.flag} 
          buttons={[{
            text: '取消',
            callback: () => {
              this.setState({ flag: false });
            }
          }, {
            text: '确认',
            callback: () => {
              this.setState({ flag: false });
              this.props.navigation.goBack(); // 利用导航器返回
            }
          }]}
          onDismiss={() => {
            this.setState({ flag: false });
          }}
        >
          <View style={{ alignItems: 'center', height: 100, justifyContent: 'center' }}>
            <Text style={{ fontSize: 15 }}>{'真的要退出吗？'}</Text>
          </View>
        </AbstractDialog>
      </View>
    );
  }
}

export default BackHandlerDemo;