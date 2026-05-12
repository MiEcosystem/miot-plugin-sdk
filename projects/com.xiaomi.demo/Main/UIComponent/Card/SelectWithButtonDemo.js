import { ContainerWithGap } from 'miot/ui';
import React from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions } from 'react-native';
import Logger from '../../Logger';
import SelectorWithButton from 'miot/ui/SelectorWithButton';

class SelectWithButtonDemo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
    this.props.navigation.setParams({
      title: "标准单选卡片 SelectorWithButton"
    });
    Logger.trace(this);

    console.log('SelectWithButtonDemo---SelectorWithButton', SelectorWithButton);
  }

  render() {
    const { selectedIndex } = this.state; 
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} style={{
          width: '100%'
        }} contentContainerStyle={{
          width: '100%',
          alignItems: 'center'
        }}>
          {<ContainerWithGap gap={12} containerStyle={{
            width: '100%',
            paddingHorizontal: 12
          }}>
            <SelectorWithButton 
              title="单选按钮"
              subtitle="我是萌萌的副标题"
              onSelected={([index]) => {
                console.log('onSelected--index---', index);
                this.setState({ selectedIndex: index });
              }}
              initSelectedIndexs={[selectedIndex]}
              maxNumberInRow={3}
              items={[
                { 
                  icon: require('../../../Resources/map/001.png'),
                  iconSelected: require('../../../Resources/map/002.png'),
                  title: '1号动物'
                },
                { 
                  icon: require('../../../Resources/map/002.png'),
                  iconSelected: require('../../../Resources/map/003.png'),
                  title: '2号动物'
                },
                { 
                  icon: require('../../../Resources/map/003.png'),
                  iconSelected: require('../../../Resources/map/004.png'),
                  title: '3号动物'
                },
                { 
                  icon: require('../../../Resources/map/004.png'),
                  iconSelected: require('../../../Resources/map/001.png'),
                  title: '4号动物'
                },
                { 
                  icon: require('../../../Resources/map/003.png'),
                  iconSelected: require('../../../Resources/map/002.png'),
                  title: '5号动物'
                },
                { 
                  icon: require('../../../Resources/map/002.png'),
                  iconSelected: require('../../../Resources/map/001.png'),
                  title: '6号动物'
                }
              ]}
            />
          </ContainerWithGap>}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // padding: 10
    // backgroundColor: 'black'
  }
});

export default SelectWithButtonDemo;
