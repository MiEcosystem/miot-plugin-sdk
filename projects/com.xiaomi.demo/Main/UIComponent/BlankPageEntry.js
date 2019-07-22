import BlankPage from 'miot/ui/BlankPage';
import { ListItem } from 'miot/ui/ListItem';
import Separator from 'miot/ui/Separator';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { View } from 'react-native';

export default class BlankPageEntry extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      header:
        <TitleBar
          type='dark'
          title='空白页面入口'
          style={{ backgroundColor: '#fff' }}
          onPressLeft={_ => navigation.goBack()}
        />
    };
  };

  render() {
    const baseProps = {
      message: '你还没创建一条数据...',
      desc: '点击按钮查看创建方法',
      extraInfo: 'ABCabc123测试'
    }
    const props1 = Object.assign({
      // type: BlankPage.TYPE.BUTTON, // 默认是按钮
      button: {
        text: '无列表时点击此按钮',
        callback: _ => alert('点击按钮')
      }
    }, baseProps);
    const props2 = Object.assign({
      type: BlankPage.TYPE.UNDERLINE,
      underline: {
        text: '无列表时点击此链接',
        callback: _ => alert('点击超链接')
      }
    }, baseProps);
    return (
      <View style={{ backgroundColor: '#f2f2f2', flex: 1 }}>
        <Separator />
        <View style={{ alignItems: 'center' }}>
          <ListItem
            title='空白页面（底部按钮）'
            onPress={_ => this.props.navigation.navigate('BlankPageDemo', { title: '空白页面（底部按钮）', props: props1 })}
          />
          <ListItem
            title='空白页面（底部下划线）'
            onPress={_ => this.props.navigation.navigate('BlankPageDemo', { title: '空白页面（底部下划线）', props: props2 })}
          />
        </View>
      </View>
    );
  }
}