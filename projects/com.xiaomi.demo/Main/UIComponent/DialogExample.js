import { Images } from 'miot/resources';
import {
  AbstractDialog,
  ActionSheet,
  ChoiceDialog,
  InputDialog,
  LoadingDialog,
  MessageDialog,
  PinCodeDialog,
  ProgressDialog,
  ShareDialog
} from 'miot/ui/Dialog';
import Separator from 'miot/ui/Separator';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import tr from "miot/resources/strings/tr";

const { width } = Dimensions.get('screen');
const testIcon = Images.common.mihome;
const testText = '它的表现和 CSS 上的max-height类似，但是在 React Native 上只能使用逻辑像素值（数字单位）或百分比，而不能使用 em 或是任何其他单位。';
const testTitle = '测试ABCabc123测试ABCabc123测试ABCabc123';
// let titleEnglish = 'Disclaimer';
let titleEnglish3 = 'maxHeight is the maximum height for this component, in logical pixels. maxHeight is the maximum height for this component, in logical pixels.';

export default class DialogExample extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    header: <TitleBar
      type="dark"
      title="米家弹窗 demo"
      style={{ backgroundColor: '#fff' }}
      onPressLeft={(_) => navigation.goBack()}
    />
  });

  constructor(props, context) {
    super(props, context);
    this.state = {
      // 测试一下是否可以动态更改
      progress: 0, // 动态更改 ProgressDialog 进度
      visible0: false,
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7: false,
      visible8: false,
      visible9: false,
      visible10: false,
      visible11: false,
      visible12: false,
      visible13: false,
      visible14: false,
      visible15: false,
      visible16: false,
      visible17: false,
      visible18: false,
      visible19: false,
      visible20: false,
      visible21: false,
      visible22: false,
      visible23: false,
      visible24: false,
      visible25: false,
      visible26: false,
      visible27: false,
      visible28: false
    };

    this.data = {
      extra: {
        checked: false // 动态更改 MessageDialog 勾选状态
      },
      inputs: [ // 动态更改 InputDialog 的输入框数据和勾选状态
        {
          placeholder: '请输入用户名',
          defaultValue: '',
          textInputProps: {
            allowFontScaling: false,
            inputStyle: {
              fontSize: 18
            }
          },
          onChangeText: (text) => console.log('用户名是', text)
        },
        {
          placeholder: '请输入密码',
          defaultValue: '',
          textInputProps: {
            allowFontScaling: false,
            inputStyle: {
              fontSize: 18
            }
          },
          onChangeText: (text) => console.log('密码是', text)
        }
      ],
      inputs2: [ // 动态更改 InputDialog 的输入框数据和勾选状态
        {
          placeholder: '请输入用户名',
          defaultValue: '',
          textInputProps: {
            allowFontScaling: true
          },
          onChangeText: (text) => console.log('用户名是', text)
        },
        {
          placeholder: '请输入密码',
          defaultValue: '',
          textInputProps: {
            allowFontScaling: true
          },
          onChangeText: (text) => console.log('密码是', text)
        }
      ],
      checkboxData: {
        checked: false,
        text: '记住密码'
      },
      selectedIndexArray: [],
      selectedIndexArray1: [],
      fontBigSize1: 28,
      fontBigSize2: 22,
      fontBigSize3: 18
    };

    this.fontFamily = {};
    if (Platform.OS === 'android') {
      this.fontFamily = { fontFamily: 'KMedium' };
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Separator />
        <ScrollView>
          {
            this.renderItem('通用弹窗容器显示默认内容(AbstractDialog)', () => {
              this.setState({ visible0: true });
            })
          }
          {
            this.renderItem('通用弹窗容器填充自定义内容(AbstractDialog)', () => {
              this.setState({ visible1: true });
            })
          }
          {
            this.renderItem('通用弹窗容器填充自定义内容(AbstractDialog)-大字体适配测试', () => {
              this.setState({ visible19: true });
            })
          }
          {
            this.renderItem('加载弹窗(LoadingDialog)', () => {
              this.setState({ visible2: true });
            })
          }
          {
            this.renderItem('加载弹窗(LoadingDialog)-大字体适配测试', () => {
              this.setState({ visible20: true });
            })
          }
          {
            this.renderItem('进度条弹窗(ProgressDialog)', () => {
              this.setState({ visible3: true, progress: 0 });
              this.timer = setInterval((_) => {
                let progress = this.state.progress;
                progress += Math.random() * 0.1;
                if (progress < 1) {
                  this.setState({ progress });
                } else {
                  this.setState({ progress: 1 });
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            })
          }
          {
            this.renderItem('进度条弹窗(ProgressDialog)-大字体适配', () => {
              this.setState({ visible21: true, progress: 0 });
              this.timer = setInterval((_) => {
                let progress = this.state.progress;
                progress += Math.random() * 0.1;
                if (progress < 1) {
                  this.setState({ progress });
                } else {
                  this.setState({ progress: 1 });
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            })
          }
          {
            this.renderItem('最简单消息弹窗(MessageDialog)', () => {
              this.setState({ visible4: true });
            })
          }
          {
            this.renderItem('带标题双按钮消息弹窗(MessageDialog)', () => {
              this.setState({ visible5: true });
            })
          }
          {
            this.renderItem('带下划线消息弹窗(MessageDialog)', () => {
              this.setState({ visible6: true });
            })
          }
          {
            this.renderItem('带☑️消息弹窗(MessageDialog)-大字体适配1', () => {
              this.setState({ visible7: true });
            })
          }
          {
            this.renderItem('消息弹窗(MessageDialog)-大字体适配2', () => {
              this.setState({ visible22: true });
            })
          }
          {
            this.renderItem('最简单输入弹窗(InputDialog)', () => {
              this.setState({ visible8: true });
            })
          }
          {
            this.renderItem('带下划线输入弹窗(InputDialog)', () => {
              this.setState({ visible9: true });
            })
          }
          {
            this.renderItem('带☑️输入弹窗(InputDialog)', () => {
              this.setState({ visible10: true });
            })
          }
          {
            this.renderItem('多TextInput复杂输入弹窗(InputDialog)-大字体适配1', () => {
              this.setState({ visible11: true });
            })
          }
          {
            this.renderItem('多TextInput复杂输入弹窗(InputDialog)-大字体适配2', () => {
              this.setState({ visible23: true });
            })
          }
          {
            this.renderItem('密码/验证码弹窗(PinCodeDialog)-默认显示', () => {
              this.setState({ visible12: true });
            })
          }
          {
            this.renderItem('密码/验证码弹窗(PinCodeDialog)-大字体适配2', () => {
              this.setState({ visible24: true });
            })
          }
          {
            this.renderItem('不分页的分享弹窗(ShareDialog)-默认显示', () => {
              this.setState({ visible13: true });
            })
          }
          {
            this.renderItem('不分页的分享弹窗(ShareDialog)-大字体适配', () => {
              this.setState({ visible25: true });
            })
          }
          {
            this.renderItem('分页的分享弹窗(ShareDialog)', () => {
              this.setState({ visible14: true });
            })
          }
          {
            this.renderItem('选项弹窗(ActionSheet)-默认显示', () => {
              this.setState({ visible15: true });
            })
          }
          {
            this.renderItem('选项弹窗(ActionSheet)-大字体适配', () => {
              this.setState({ visible26: true });
            })
          }
          {
            this.renderItem('单选弹窗(ChoiceDialog)-默认显示', () => {
              this.setState({ visible16: true });
            })
          }
          {
            this.renderItem('单选弹窗(ChoiceDialog)-大字体适配', () => {
              this.setState({ visible27: true });
            })
          }
          {
            this.renderItem('多选弹窗(ChoiceDialog)-默认显示', () => {
              this.setState({ visible17: true });
            })
          }
          <View>
            <AbstractDialog
              visible={this.state.visible0}
              // title={testTitle}
              // title={testText}
              // title={titleEnglish}
              title={titleEnglish3}
              //   subtitle={testTitle}
              //   showSubtitle
              onDismiss={(_) => this.onDismiss('0')}
            />
            <AbstractDialog
              canDismiss={false}
              visible={this.state.visible18}
              // title={testTitle}
              // title={testText}
              // title={titleEnglish}
              title={titleEnglish3}
              //   subtitle={testTitle}
              //   showSubtitle
              onDismiss={(_) => this.onDismiss('18')}
            />
            <AbstractDialog
              visible={this.state.visible1}
              title={testTitle}
              subtitle={testTitle}
              showSubtitle
              onDismiss={(_) => this.onDismiss('1')}
              buttons={[
                {
                  text: '是吗',
                  style: { color: 'lightpink' },
                  callback: (_) => console.log('是吗')
                },
                {
                  text: '是啊',
                  style: { color: '#f0ac3d' },
                  callback: (_) => console.log('是啊')
                }
              ]}
            >
              <View
                style={{
                  flex: 1,
                  height: 200,
                  backgroundColor: 'lightblue',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text>你看她笑得多开心啊</Text>
              </View>
            </AbstractDialog>
            <AbstractDialog
              visible={this.state.visible19}
              title="标题-不随系统字体大小变化而变化-我只显示一行"
              subtitle="副标题-不随系统字体大小变化而变化-我设置为最多显示两行"
              dialogStyle={{
                allowFontScaling: false,
                titleNumberOfLines: 1,
                subTitleNumberOfLines: 2,
                unlimitedHeightEnable: true,
                titleStyle: {
                  fontSize: this.data.fontBigSize1
                },
                subTitleStyle: {
                  fontSize: this.data.fontBigSize3
                }
              }}
              showSubtitle
              onDismiss={(_) => this.onDismiss('19')}
              buttons={[
                {
                  text: '取消-不随系统字体大小变化而变化-高度自适应',
                  allowFontScaling: false,
                  style: { color: 'lightpink', padding: 10, fontSize: this.data.fontBigSize2 },
                  callback: (_) => console.log('是吗')
                },
                {
                  text: '确认-随系统字体大小变化而变化-我只显示两行',
                  allowFontScaling: true,
                  numberOfLines: 2,
                  style: { color: '#f0ac3d', padding: 10, fontSize: this.data.fontBigSize2 },
                  callback: (_) => console.log('是啊')
                }
              ]}
            >
              <View
                style={{
                  flex: 1,
                  height: 100,
                  backgroundColor: 'lightblue',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ fontSize: this.data.fontBigSize3 }}>你看她笑得多开心啊</Text>
              </View>
            </AbstractDialog>
            <LoadingDialog
              visible={this.state.visible2}
              message="加载中，请稍后...(字体大小随系统字体大小变化而变化)"
              timeout={3000}
              onDismiss={(_) => this.onDismiss('2')}
            />
            <LoadingDialog
              visible={this.state.visible20}
              message="加载中，请稍后...(字体大小不随系统字体大小变化而变化，文字设置为最多显示四行)"
              dialogStyle={{
                allowFontScaling: false,
                textNumberOfLines: 4,
                unlimitedHeightEnable: true,
                messageStyle: {
                  fontSize: this.data.fontBigSize2
                }
              }}
              timeout={3000}
              onDismiss={(_) => this.onDismiss('20')}
            />
            <ProgressDialog
              autoDismiss
              visible={this.state.visible3}
              message="下载中，请稍后..."
              color="#f0ac3d"
              unfilledColor="#fff"
              textColor="blue"
              progress={this.state.progress}
              onDismiss={(_) => this.onDismiss('3')}
            />
            <ProgressDialog
              autoDismiss
              visible={this.state.visible21}
              message="下载中，请稍后...(一行显示不下，自动换行显示, 文字大小不随系统字体大小改变而改变)"
              color="#f0ac3d"
              unfilledColor="#fff"
              textColor="blue"
              progress={this.state.progress}
              dialogStyle={{
                allowFontScaling: false,
                messageNumberOfLines: 5,
                messageStyle: {
                  fontSize: this.data.fontBigSize2
                },
                progressTextStyle: {
                  fontSize: this.data.fontBigSize2
                }
              }}
              onDismiss={(_) => this.onDismiss('21')}
            />
            <MessageDialog
              visible={this.state.visible4}
              message="测试abcABC123"
              messageStyle={{ textAlign: 'center', backgroundColor: 'lightblue' }}
              buttons={[
                {
                  text: '我了解了',
                  style: { color: 'lightpink' },
                  callback: (_) => this.setState({ visible4: false })
                }
              ]}
              onDismiss={(_) => this.onDismiss('4')}
            />
            <MessageDialog
              visible={this.state.visible5}
              title="消息弹窗自定义标题"
              message={testText}
              buttons={[
                {
                  text: '消失',
                  style: { color: 'lightpink' },
                  callback: (_) => this.setState({ visible5: false })
                },
                {
                  text: '不消失',
                  style: { color: 'lightblue' },
                  callback: (_) => console.log('不消失')
                }
              ]}
              onDismiss={(_) => this.onDismiss('5')}
            />
            <MessageDialog
              type={MessageDialog.TYPE.UNDERLINE}
              visible={this.state.visible6}
              color="#f0ac3d"
              title="下划线消息弹窗"
              message={testText}
              extraText="你点我一下试试"
              extra={{
                onPress: (_) => alert('点击了下划线')
              }}
              buttons={[
                {
                  text: '取消',
                  style: { color: 'lightpink' },
                  callback: (_) => this.setState({ visible6: false })
                },
                {
                  text: '确认',
                  style: { color: 'lightblue' },
                  callback: (obj) => {
                    console.log(`是否点击了下划线: ${ obj.hasPressUnderlineText }`);
                    this.setState({ visible6: false });
                  }
                }
              ]}
              onDismiss={(_) => this.onDismiss('6')}
            />
            <MessageDialog
              type={MessageDialog.TYPE.CHECKBOX}
              visible={this.state.visible7}
              color="#f0ac3d"
              title="勾选框消息弹窗-字体大小不随系统字体大小改变而改变-自动换行"
              messageStyle={[{ fontSize: this.data.fontBigSize2, lineHeight:this.data.fontBigSize2+4 }, this.fontFamily]}
              dialogStyle={{
                allowFontScaling: false,
                titleNumberOfLines: 10,
                messageNumberOfLines: 3,
                extraTextNumberOfLines: 4,
                titleStyle: {
                  fontSize: this.data.fontBigSize1,
                  lineHeight: this.data.fontBigSize1+4,
                },
                extraTextStyle: {
                  fontSize: this.data.fontBigSize3,
                  lineHeight: this.data.fontBigSize3+4,
                }
              }}
              message="message 部分-字体大小不随系统字体大小改变而改变-我设置显示为三行"
              extraText="快点我试试-字体大小不随系统字体大小改变而改变-我设置显示为两行"
              extra={this.data.extra}
              buttons={[
                {
                  text: '取消-不随系统字体大小变化而变化-高度自适应',
                  allowFontScaling: false,
                  numberOfLines: 12,
                  style: { color: 'lightpink', padding: 10, fontSize: this.data.fontBigSize2, lineHeight: this.data.fontBigSize2+4, },
                  callback: (_) => this.setState({ visible7: false })
                },
                {
                  text: '确认-不随系统字体大小变化而变化-我只显示两行',
                  allowFontScaling: false,
                  numberOfLines: 2,
                  style: { color: 'lightblue', padding: 10, fontSize: this.data.fontBigSize2, lineHeight: this.data.fontBigSize2+4, },
                  callback: (obj) => {
                    console.log(`是否勾选: ${ obj.checked }`);
                    this.setState({ visible7: false });
                  }
                }
              ]}
              onDismiss={(_) => this.onDismiss('7')}
            />
            <MessageDialog
              type={MessageDialog.TYPE.CHECKBOX}
              dialogStyle={{
                allowFontScaling: true,
                titleNumberOfLines: 10,
                messageNumberOfLines: 2,
                extraTextNumberOfLines: 2
              }}
              visible={this.state.visible22}
              color="#f0ac3d"
              title="消息弹窗-字体大小随系统字体大小改变而改变-自动换行"
              message="message 部分-字体大小随系统字体大小改变而改变-我设置显示为两行"
              extraText="快点我试试-字体大小随系统字体大小改变而改变-我设置显示为两行"
              extra={{
                checked: false
              }}
              buttons={[
                {
                  text: '取消-不随系统字体大小变化而变化-高度自适应',
                  allowFontScaling: true,
                  numberOfLines: 12,
                  style: { color: 'lightpink', padding: 10 },
                  callback: (_) => this.setState({ visible22: false })
                },
                {
                  text: '确认-随系统字体大小变化而变化-我只显示两行',
                  allowFontScaling: true,
                  numberOfLines: 2,
                  style: { color: 'lightblue', padding: 10 },
                  callback: (obj) => {
                    this.setState({ visible22: false });
                  }
                }
              ]}
              onDismiss={(_) => this.onDismiss('22')}
            />
            <InputDialog
              visible={this.state.visible8}
              title="最简单输入弹窗"
              onDismiss={(_) => this.onDismiss('8')}
            />
            <InputDialog
              type={InputDialog.TYPE.UNDERLINE}
              visible={this.state.visible9}
              title="带下划线输入弹窗"
              underlineData={{
                leftText: '请输入你的ID',
                underlineText: '还没有ID？注册一个',
                onPress: (_) => alert('你注册的ID是123456')
              }}
              buttons={[
                {
                  text: '取消',
                  style: { color: 'lightpink' },
                  callback: (_) => this.setState({ visible9: false })
                },
                {
                  text: '保存',
                  style: { color: 'lightblue' },
                  callback: (result) => {
                    console.log(`结果`, result);
                    this.setState({ visible9: false });
                  }
                }
              ]}
              onDismiss={(_) => this.onDismiss('9')}
            />
            <InputDialog
              type={InputDialog.TYPE.CHECKBOX}
              visible={this.state.visible10}
              title="带☑️输入弹窗"
              checkboxData={{
                checked: true,
                text: '记住密码'
              }}
              buttons={[
                {
                  text: '取消',
                  style: { color: 'lightpink' },
                  callback: (_) => this.setState({ visible10: false })
                },
                {
                  text: '保存',
                  style: { color: 'lightblue' },
                  callback: (result) => {
                    console.log(`结果`, result);
                    this.setState({ visible10: false });
                  }
                }
              ]}
              onDismiss={(_) => this.onDismiss('10')}
            />
            <InputDialog
              visible={this.state.visible11}
              type={InputDialog.TYPE.BOTH}
              color="#f0ac3d"
              dialogStyle={{
                allowFontScaling: false,
                titleNumberOfLines: 10,
                titleStyle: {
                  fontSize: this.data.fontBigSize1
                }
              }}
              title="多TextInput复杂输入弹窗-字体大小不随系统字体大小改变而改变-自动换行"
              underlineData={{
                leftText: '请输入你的ID-字体大小不随系统字体大小改变而改变-自动换行',
                leftTextNumberOfLines: 10,
                leftTextStyle: { fontSize: this.data.fontBigSize3 },
                underlineText: '还没有ID？注册一个-字体大小不随系统字体大小改变而改变-自动换行',
                underlineTextNumberOfLines: 10,
                underlineTextStyle: { fontSize: this.data.fontBigSize3 },
                onPress: (_) => alert('你注册的ID是123456')
              }}
              inputs={this.data.inputs}
              checkboxData={
                {
                  checked: false,
                  text: '记住密码--字体大小不随系统字体大小改变而改变-自动换行',
                  numberOfLines: 10,
                  textStyle: { fontSize: this.data.fontBigSize3 }
                }
              }
              buttons={[
                {
                  text: '取消-不随系统字体大小变化而变化-高度自适应',
                  allowFontScaling: false,
                  numberOfLines: 12,
                  style: { color: 'lightpink', padding: 10, fontSize: this.data.fontBigSize2 },
                  callback: (_) => this.setState({ visible11: false })
                },
                {
                  text: '确认-不随系统字体大小变化而变化-我只显示两行',
                  allowFontScaling: false,
                  numberOfLines: 2,
                  style: { color: 'lightblue', padding: 10, fontSize: this.data.fontBigSize2 },
                  callback: (result) => {
                    console.log(`结果`, result);
                    this.setState({ visible11: false });
                  }
                }
              ]}
              onDismiss={(_) => this.onDismiss('11')}
            />
            <InputDialog
              visible={this.state.visible23}
              type={InputDialog.TYPE.BOTH}
              color="#f0ac3d"
              dialogStyle={{
                allowFontScaling: true,
                titleNumberOfLines: 1
              }}
              title="多TextInput复杂输入弹窗-字体大小随系统字体大小改变而改变-显示一行"
              underlineData={{
                leftText: '请输入你的ID-字体大小随系统字体大小改变而改变-自动换行',
                leftTextNumberOfLines: 10,
                underlineText: '还没有ID？注册一个-字体大小不随系统字体大小改变而改变-自动换行',
                underlineTextNumberOfLines: 10,
                onPress: (_) => alert('你注册的ID是123456')
              }}
              inputs={this.data.inputs2}
              checkboxData={
                {
                  checked: false,
                  text: '记住密码--字体大小不随系统字体大小改变而改变-自动换行',
                  numberOfLines: 10
                }
              }
              buttons={[
                {
                  text: '取消-随系统字体大小变化而变化-高度自适应',
                  allowFontScaling: true,
                  numberOfLines: 12,
                  style: { color: 'lightpink', padding: 10 },
                  callback: (_) => this.setState({ visible23: false })
                },
                {
                  text: '确认-随系统字体大小变化而变化-我只显示两行',
                  allowFontScaling: true,
                  numberOfLines: 2,
                  style: { color: 'lightblue', padding: 10 },
                  callback: (result) => {
                    console.log(`结果`, result);
                    this.setState({ visible23: false });
                  }
                }
              ]}
              onDismiss={(_) => this.onDismiss('23')}
            />
            <PinCodeDialog
              visible={this.state.visible12}
              title="密码/验证码弹窗-默认情况-字体大小随系统字体大小改变而改变-默认1行"
              message="message-默认情况-字体大小随系统字体大小改变而改变-自动换行"
              digit={6}
              color="#f0ac3d"
              checkboxData={this.data.checkboxData}
              buttons={[
                {
                  text: '确定-字体大小随系统字体大小改变而改变-自动换行，高度固定',
                  style: { color: 'lightblue', padding: 10 },
                  callback: (result) => {
                    console.log(`结果`, result);
                    this.setState({ visible12: false });
                  }
                }
              ]}
              onDismiss={(_) => this.onDismiss('12')}
            />
            <PinCodeDialog
              visible={this.state.visible24}
              title="密码/验证码弹窗-字体大小不随系统字体大小改变而改变-自动换行"
              message="message-字体大小不随系统字体大小改变而改变-自动换行"
              dialogStyle={{
                allowFontScaling: false,
                titleNumberOfLines: 10,
                messageNumberOfLines: 10,
                titleStyle: { fontSize: this.data.fontBigSize1 },
                messageStyle: { fontSize: this.data.fontBigSize2, lineHeight: this.data.fontBigSize2 + 4 },
                digitStyle: { fontSize: this.data.fontBigSize1 }
              }}
              digit={6}
              color="#f0ac3d"
              checkboxData={{
                checked: false,
                text: '记住密码',
                textStyle: { fontSize: this.data.fontBigSize3 }
              }}
              buttons={[
                {
                  text: '确定-字体大小不随系统字体大小改变而改变-显示1行',
                  style: { color: 'lightblue', padding: 10, fontSize: this.data.fontBigSize2 },
                  allowFontScaling: false,
                  numberOfLines: 1,
                  callback: (result) => {
                    console.log(`结果`, result);
                    this.setState({ visible24: false });
                  }
                }
              ]}
              onDismiss={(_) => this.onDismiss('24')}
            />
            <ShareDialog
              visible={this.state.visible13}
              title="不分页的分享弹窗-默认情况-字体大小随系统字体大小改变而改变-默认1行"
              onDismiss={(_) => this.onDismiss('13')}
            />
            <ShareDialog
              visible={this.state.visible25}
              title="不分页的分享弹窗-字体大小不随系统字体大小改变而改变-最多2行"
              dialogStyle={{
                allowFontScaling: false,
                titleNumberOfLines: 1,
                itemTextNumberOfLines: 2,
                titleStyle: { fontSize: this.data.fontBigSize1 },
                itemTextStyle: { fontSize: this.data.fontBigSize3 }
              }}
              options={
                Array.from({ length: 6 }, (v, i) => ({
                  icon: testIcon,
                  text: [`米家-最多显示两行`, `微信`, `QQ`, `微博`, `朋友圈`, `收藏`, `即刻`][~~(i)],
                  callback: () => console.log('分享成功')
                }))
              }
              onDismiss={(_) => this.onDismiss('25')}
            />
            <ShareDialog
              visible={this.state.visible14}
              title="分页的分享弹窗"
              options={
                Array.from({ length: 15 }, (v, i) => ({
                  icon: testIcon,
                  text: [`米家米家米家米家米家米家`, `微信`, `QQ`, `微博`, `朋友圈`, `收藏`, `即刻`][~~(Math.random() * 7)],
                  callback: () => console.log('分享成功')
                }))
              }
              onDismiss={(_) => this.onDismiss('14')}
            />
            <ActionSheet
              visible={this.state.visible15}
              options={[
                {
                  title: 'title-1-默认显示',
                  subtitle: 'subtitle-1-默认显示',
                  onPress: (_) => console.log('非礼勿视')
                },
                {
                  title: 'title-2-默认显示',
                  onPress: (_) => console.log('非礼勿听')
                },
                {
                  title: 'title-3-默认显示',
                  subtitle: 'subtitle-3-默认显示',
                  onPress: (_) => console.log('非礼勿言')
                }
              ]}
              buttons={[
                {
                  text: '取消',
                  style: { color: 'lightblue' },
                  callback: (_) => this.setState({ visible15: false })
                }
              ]}
              onDismiss={(_) => this.onDismiss('15')}
            />
            <ActionSheet
              visible={this.state.visible26}
              dialogStyle={{
                allowFontScaling: false,
                unlimitedHeightEnable: true,
                itemTitleStyle: {
                  fontSize: 26,
                  lineHeight: 28,
                  paddingTop: 6,
                  paddingLeft: 6,
                  paddingRight: 6
                },
                itemSubtitleStyle: {
                  fontSize: 20,
                  lineHeight: 22,
                  paddingLeft: 6,
                  paddingRight: 6,
                  paddingBottom: 6
                },
                itemTitleNumberOfLines: 2,
                itemSubtitleNumberOfLines: 4
              }}
              options={[
                {
                  title: 'title-1-字体大小不随系统变化而变化-我最多显示两行',
                  subtitle: 'subtitle-1-字体大小不随系统变化而变化-我最多显示四行',
                  onPress: (_) => console.log('非礼勿视')
                },
                {
                  title: 'title-2-字体大小不随系统变化而变化',
                  subtitle: 'subtitle-2-字体大小不随系统变化而变化',
                  onPress: (_) => console.log('非礼勿听')
                },
                {
                  title: 'title-3-字体大小不随系统变化而变化',
                  subtitle: 'subtitle-3-字体大小不随系统变化而变化',
                  onPress: (_) => console.log('非礼勿言')
                }
              ]}
              buttons={[
                {
                  text: '取消-字体大小不随系统变化而变化',
                  style: { color: 'lightblue', padding: 14, fontSize: this.data.fontBigSize2 },
                  callback: (_) => this.setState({ visible26: false })
                }
              ]}
              onDismiss={(_) => this.onDismiss('26')}
            />
            <ChoiceDialog
              visible={this.state.visible16}
              title={'单选弹窗'}
              options={[
                {
                  title: 'Test',
                  subtitle: 'test'
                },
                {
                  title: 'Test'
                },
                {
                  title: '测试',
                  subtitle: '测试'
                }
              ]}
              selectedIndexArray={this.data.selectedIndexArray}
              onDismiss={(_) => this.onDismiss('16')}
              onSelect={(result) => this.data.selectedIndexArray = result}
            />
            <ChoiceDialog
              visible={this.state.visible27}
              title={'单选弹窗-大字体适配'}
              dialogStyle={{
                allowFontScaling: false,
                unlimitedHeightEnable: true,
                titleStyle: {
                  fontSize: 28
                },
                itemTitleStyle: {
                  fontSize: 26,
                  lineHeight: 28,
                  paddingTop: 6,
                  paddingLeft: 6,
                  paddingRight: 6
                },
                itemSubtitleStyle: {
                  fontSize: 20,
                  lineHeight: 22,
                  paddingLeft: 6,
                  paddingRight: 6,
                  paddingBottom: 6
                },
                itemTitleNumberOfLines: 2,
                itemSubtitleNumberOfLines: 4
              }}
              options={[
                {
                  title: 'title-1-字体大小不随系统变化而变化-我最多显示两行',
                  subtitle: 'subtitle-1-字体大小不随系统变化而变化-我最多显示四行',
                  onPress: (_) => console.log('非礼勿视')
                },
                {
                  title: 'title-2-字体大小不随系统变化而变化',
                  subtitle: 'subtitle-2-字体大小不随系统变化而变化',
                  onPress: (_) => console.log('非礼勿听')
                },
                {
                  title: 'title-3-字体大小不随系统变化而变化',
                  subtitle: 'subtitle-3-字体大小不随系统变化而变化',
                  onPress: (_) => console.log('非礼勿言')
                }
              ]}
              selectedIndexArray={this.data.selectedIndexArray}
              onDismiss={(_) => this.onDismiss('27')}
              onSelect={(result) => this.data.selectedIndexArray = result}
            />
            <ChoiceDialog
              type={ChoiceDialog.TYPE.MULTIPLE}
              visible={this.state.visible17}
              title={'多选弹窗'}
              options={[
                {
                  title: '🙈',
                  subtitle: '🙈'
                },
                {
                  title: '🙉',
                  subtitle: '🙉'
                },
                {
                  title: '🙊',
                  subtitle: '🙊'
                }
              ]}
              selectedIndexArray={this.data.selectedIndexArray1}
              color="#f0ac3d"
              buttons={[
                {
                  text: '保存',
                  style: { color: 'lightblue' },
                  callback: (result) => {
                    console.log(`选中的选项`, result);
                    this.data.selectedIndexArray1 = result;
                    this.setState({
                      visible17: false
                    });
                  }
                }
              ]}
              onDismiss={(_) => this.onDismiss('17')}
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  renderItem(text, onPress) {
    return (
      <TouchableHighlight underlayColor="#838383" onPress={onPress}>
        <View>
          <View style={styles.itemContainer}>
            <Text style={styles.itemText} allowFontScaling={false}>{text}</Text>
            <Image style={styles.itemArrow} source={require('../../Resources/sub_arrow.png')} />
          </View>
          <Separator />
        </View>
      </TouchableHighlight>
    );
  }

  componentDidMount() {
    setTimeout((_) => this.setState({
      extra: {
        checked: true
      },
      inputs: [
        {
          textInputProps: {
            autoFocus: true
          },
          placeholder: 'userName',
          defaultValue: '123',
          onChangeText: (text) => console.log('用户名是', text)
        },
        {
          placeholder: 'password',
          defaultValue: '456',
          onChangeText: (text) => console.log('密码是', text)
        }
      ],
      checkboxData: {
        checked: true,
        text: '记住密码'
      },
      selectedIndexArray: [0],
      selectedIndexArray1: [0]
    }), 3500);
  }


  // `Modal` 隐藏了，父组件必须要同步更新状态，但不必用 `setState` 触发 `render`
  onDismiss(index) {
    if (index === '2') console.log('loadingdialog dismiss');
    // this.state[`visible${ index }`] = false;
    this.setState({
      [`visible${ index }`]: false
    });
  }


  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    flex: 1
  },
  label: {
    width,
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16
  },
  itemContainer: {
    minHeight: 52,
    alignSelf: 'stretch',
    flexDirection: 'row',
    paddingLeft: 23,
    paddingRight: 23,
    alignItems: 'center',
    flex: 1
  },
  itemText: {
    fontSize: 15,
    color: '#333333',
    alignItems: 'center',
    flex: 1
  },
  itemArrow: {
    width: 7,
    height: 14
  }
});
