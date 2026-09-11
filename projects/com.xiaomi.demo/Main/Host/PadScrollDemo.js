import { Host } from "miot";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { PAD_SCROLL_STRATEGY } from "miot/Host";

const { width } = Dimensions.get("window");
export default class PadScrollDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ styles.mainContainer }>
        <View style={ styles.textStatus }>
          <Text>
            { '这是一个View为父容器的页面，所以它是不会响应滑动事件的，当你把滑动策略设置为ALWAYS_PLUGIN_DEAL时，Pad横屏状态将无法滑动看到最下面的ScrollView' }
          </Text>
        </View>
        { this.renderItem('AUTO', () => {
          Host.setPadScrollDealStrategy({ strategy: PAD_SCROLL_STRATEGY.AUTO });
        }) }
        { this.renderItem('ALWAYS_SDK_DEAL', () => {
          Host.setPadScrollDealStrategy({ strategy: PAD_SCROLL_STRATEGY.ALWAYS_SDK_DEAL });
        }) }
        { this.renderItem('ALWAYS_PLUGIN_DEAL(支持滑动嵌套)', () => {
          Host.setPadScrollDealStrategy({ strategy: PAD_SCROLL_STRATEGY.ALWAYS_PLUGIN_DEAL });
        }) }
        <View style={ { flex: 1, flexDirection: 'column', justifyContent: 'flex-end' } }>
          <View style={ { width: width, height: 100, backgroundColor: 'green' } }>
            <ScrollView>
              <Text style={ styles.textStatus }>{ 'ALWAYS_PLUGIN_DEAL下横屏是看不到我的' }</Text>
              <Text style={ styles.textStatus }>{ '填充111' }</Text>
              <Text style={ styles.textStatus }>{ '填充222' }</Text>
              <Text style={ styles.textStatus }>{ '填充333' }</Text>
              <Text style={ styles.textStatus }>{ '填充444' }</Text>
              <Text style={ styles.textStatus }>{ '填充555' }</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }

  renderItem = (title, func) => {
    return (
      <View style={ styles.itemContainer }>
        <TouchableOpacity onPress={ func }>
          <View style={ styles.itemContent }>
            <Text>
              { title }
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  componentWillUnmount() {
    Host.setPadScrollDealStrategy({ strategy: PAD_SCROLL_STRATEGY.AUTO });
  }

}
const styles = StyleSheet.create(
  {
    mainContainer: {
      flex: 1,
      flexDirection: 'column'
    },
    textStatus: {
      marginTop: 10,
      marginStart: width / 10,
      marginEnd: width / 10,
      flexDirection: 'row'
    },
    itemContainer: {
      width: width,
      height: 85,
      alignItems: 'center',
      justifyContent: 'center'
    },
    itemContent: {
      height: 50,
      width: width * 4 / 5,
      backgroundColor: '#3CB371',
      alignItems: 'center',
      justifyContent: 'center'
    },
    logContainer: {
      margin: 20
    }
  }
);