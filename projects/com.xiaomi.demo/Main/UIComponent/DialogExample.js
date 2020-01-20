import { Images } from 'miot/resources';
import { AbstractDialog, ActionSheet, ChoiceDialog, InputDialog, LoadingDialog, MessageDialog, PinCodeDialog, ProgressDialog, ShareDialog } from 'miot/ui/Dialog';
import Separator from 'miot/ui/Separator';
import TitleBar from 'miot/ui/TitleBar';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

const { width } = Dimensions.get('screen');
const testIcon = Images.common.mihome;
const testText = '它的表现和 CSS 上的max-height类似，但是在 React Native 上只能使用逻辑像素值（数字单位）或百分比，而不能使用 em 或是任何其他单位。';
const testTitle = '测试ABCabc123测试ABCabc123测试ABCabc123';
let titleEnglish = 'Disclaimer';
let titleEnglish3 = 'maxHeight is the maximum height for this component, in logical pixels. maxHeight is the maximum height for this component, in logical pixels.';

export default class DialogExample extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        header: <TitleBar
            type="dark"
            title="米家弹窗 demo"
            style={{ backgroundColor: '#fff' }}
            onPressLeft={_ => navigation.goBack()}
        />
    });

    constructor(props, context) {
        super(props, context);
        this.state = {
            // 测试一下是否可以动态更改
            progress: 0, // 动态更改 ProgressDialog 进度
            extra: {
                checked: false // 动态更改 MessageDialog 勾选状态
            },
            inputs: [ // 动态更改 InputDialog 的输入框数据和勾选状态
                {
                    placeholder: '',
                    defaultValue: '',
                    onChangeText: text => console.log('用户名是', text)
                },
                {
                    placeholder: '',
                    defaultValue: '',
                    onChangeText: text => console.log('密码是', text)
                }
            ],
            checkboxData: {
                checked: false,
                text: ''
            },
            selectedIndexArray: [],
            selectedIndexArray1: [],
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
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Separator />
                <ScrollView>
                    <View>
                        <Text
                            style={styles.label}
                            onPress={_ => this.setState({ visible0: true })}
                        >
                            {'通用弹窗容器显示默认内容(AbstractDialog)'}
                        </Text>
                        <Text
                            style={styles.label}
                            onPress={_ => this.setState({ visible18: true })}
                        >
                            {'通用弹窗容器canNotDismiss (AbstractDialog)'}
                        </Text>
                        <Text
                            style={styles.label}
                            onPress={_ => this.setState({ visible1: true })}
                        >
                            {'通用弹窗容器填充自定义内容(AbstractDialog)'}
                        </Text>
                        <Text
                            style={styles.label}
                            onPress={_ => this.setState({ visible2: true })}
                        >
                            {'加载弹窗(LoadingDialog)'}
                        </Text>
                        <Text
                            style={styles.label}
                            onPress={_ => {
                                this.state.progress = 0;
                                this.setState({ visible3: true });
                                this.timer = setInterval(_ => {
                                    let progress = this.state.progress;
                                    progress += Math.random() * 0.1;
                                    if (progress < 1) {
                                        this.setState({ progress });
                                    }
                                    else {
                                        this.setState({ progress: 1 });
                                        clearInterval(this.timer);
                                        this.timer = null;
                                    }
                                }, 1000);
                            }}
                        >
                            {'进度条弹窗(ProgressDialog)'}
                        </Text>
                        <Text
                            style={styles.label}
                            onPress={_ => this.setState({ visible4: true })}
                        >
                            {'最简单消息弹窗(MessageDialog)'}
                        </Text>
                        <Text
                            style={styles.label}
                            onPress={_ => this.setState({ visible5: true })}
                        >
                            {'带标题双按钮消息弹窗(MessageDialog)'}
                        </Text>
                        <Text
                            style={styles.label}
                            onPress={_ => this.setState({ visible6: true })}
                        >
                            {'带下划线消息弹窗(MessageDialog)'}
                        </Text>
                        <Text
                            style={styles.label}
                            onPress={_ => this.setState({ visible7: true })}
                        >
                            {'带☑️消息弹窗(MessageDialog)'}
                        </Text>
                        <Text
                            style={styles.label}
                            onPress={_ => this.setState({ visible8: true })}
                        >
                            {'最简单输入弹窗(InputDialog)'}
                        </Text>
                        <Text
                            style={styles.label}
                            onPress={_ => this.setState({ visible9: true })}
                        >
                            {'带下划线输入弹窗(InputDialog)'}
                        </Text>
                        <Text
                            style={styles.label}
                            onPress={_ => this.setState({ visible10: true })}
                        >
                            {'带☑️输入弹窗(InputDialog)'}
                        </Text>
                        <Text
                            style={styles.label}
                            onPress={_ => this.setState({ visible11: true })}
                        >
                            {'多TextInput复杂输入弹窗(InputDialog)'}
                        </Text>
                        <Text
                            style={styles.label}
                            onPress={_ => this.setState({ visible12: true })}
                        >
                            {'密码/验证码弹窗(PinCodeDialog)'}
                        </Text>
                        <Text
                            style={styles.label}
                            onPress={_ => this.setState({ visible13: true })}
                        >
                            {'不分页的分享弹窗(ShareDialog)'}
                        </Text>
                        <Text
                            style={styles.label}
                            onPress={_ => this.setState({ visible14: true })}
                        >
                            {'分页的分享弹窗(ShareDialog)'}
                        </Text>
                        <Text
                            style={styles.label}
                            onPress={_ => this.setState({ visible15: true })}
                        >
                            {'选项弹窗(ActionSheet)'}
                        </Text>
                        <Text
                            style={styles.label}
                            onPress={_ => this.setState({ visible16: true })}
                        >
                            {'单选弹窗(ChoiceDialog)'}
                        </Text>
                        <Text
                            style={styles.label}
                            onPress={_ => this.setState({ visible17: true })}
                        >
                            {'多选弹窗(ChoiceDialog)'}
                        </Text>
                        <AbstractDialog
                            visible={this.state.visible0}
                            // title={testTitle}
                            // title={testText}
                            // title={titleEnglish}
                            title={titleEnglish3}
                            //   subtitle={testTitle}
                            //   showSubtitle
                            onDismiss={_ => this.onDismiss('0')}
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
                            onDismiss={_ => this.onDismiss('18')}
                        />
                        <AbstractDialog
                            visible={this.state.visible1}
                            title={testTitle}
                            subtitle={testTitle}
                            showSubtitle
                            onDismiss={_ => this.onDismiss('1')}
                            buttons={[
                                {
                                    text: '是吗',
                                    style: { color: 'lightpink' },
                                    callback: _ => console.log('是吗')
                                },
                                {
                                    text: '是啊',
                                    style: { color: '#f0ac3d' },
                                    callback: _ => console.log('是啊')
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
                        <LoadingDialog
                            visible={this.state.visible2}
                            message='加载中，请稍后...'
                            timeout={3000}
                            onDismiss={_ => this.onDismiss('2')}
                        />
                        <ProgressDialog
                            autoDismiss
                            visible={this.state.visible3}
                            message='下载中，请稍后...'
                            color='#f0ac3d'
                            unfilledColor='#fff'
                            textColor='blue'
                            progress={this.state.progress}
                            onDismiss={_ => this.onDismiss('3')}
                        />
                        <MessageDialog
                            visible={this.state.visible4}
                            message='测试abcABC123'
                            messageStyle={{ textAlign: 'center', backgroundColor: 'lightblue' }}
                            buttons={[
                                {
                                    text: '我了解了',
                                    style: { color: 'lightpink' },
                                    callback: _ => this.setState({ visible4: false })
                                },
                            ]}
                            onDismiss={_ => this.onDismiss('4')}
                        />
                        <MessageDialog
                            visible={this.state.visible5}
                            title='消息弹窗自定义标题'
                            message={testText}
                            buttons={[
                                {
                                    text: '消失',
                                    style: { color: 'lightpink' },
                                    callback: _ => this.setState({ visible5: false })
                                },
                                {
                                    text: '不消失',
                                    style: { color: 'lightblue' },
                                    callback: _ => console.log('不消失')
                                },
                            ]}
                            onDismiss={_ => this.onDismiss('5')}
                        />
                        <MessageDialog
                            type={MessageDialog.TYPE.UNDERLINE}
                            visible={this.state.visible6}
                            color='#f0ac3d'
                            title='下划线消息弹窗'
                            message={testText}
                            extraText='你点我一下试试'
                            extra={{
                                onPress: _ => alert('点击了下划线')
                            }}
                            buttons={[
                                {
                                    text: '取消',
                                    style: { color: 'lightpink' },
                                    callback: _ => this.setState({ visible6: false })
                                },
                                {
                                    text: '确认',
                                    style: { color: 'lightblue' },
                                    callback: obj => {
                                        console.log(`是否点击了下划线: ${obj.hasPressUnderlineText}`);
                                        this.setState({ visible6: false })
                                    }
                                },
                            ]}
                            onDismiss={_ => this.onDismiss('6')}
                        />
                        <MessageDialog
                            type={MessageDialog.TYPE.CHECKBOX}
                            visible={this.state.visible7}
                            color='#f0ac3d'
                            title='勾选框消息弹窗'
                            message={testText}
                            extraText='快点我试试'
                            extra={this.state.extra}
                            buttons={[
                                {
                                    text: '取消',
                                    style: { color: 'lightpink' },
                                    callback: _ => this.setState({ visible7: false })
                                },
                                {
                                    text: '确认',
                                    style: { color: 'lightblue' },
                                    callback: obj => {
                                        console.log(`是否勾选: ${obj.checked}`);
                                        this.setState({ visible7: false })
                                    }
                                },
                            ]}
                            onDismiss={_ => this.onDismiss('7')}
                        />
                        <InputDialog
                            visible={this.state.visible8}
                            title='最简单输入弹窗'
                            onDismiss={_ => this.onDismiss('8')}
                        />
                        <InputDialog
                            type={InputDialog.TYPE.UNDERLINE}
                            visible={this.state.visible9}
                            title='带下划线输入弹窗'
                            underlineData={{
                                leftText: '请输入你的ID',
                                underlineText: '还没有ID？注册一个',
                                onPress: _ => alert('你注册的ID是123456')
                            }}
                            buttons={[
                                {
                                    text: '取消',
                                    style: { color: 'lightpink' },
                                    callback: _ => this.setState({ visible9: false })
                                },
                                {
                                    text: '保存',
                                    style: { color: 'lightblue' },
                                    callback: result => {
                                        console.log(`结果`, result);
                                        this.setState({ visible9: false });
                                    }
                                },
                            ]}
                            onDismiss={_ => this.onDismiss('9')}
                        />
                        <InputDialog
                            type={InputDialog.TYPE.CHECKBOX}
                            visible={this.state.visible10}
                            title='带☑️输入弹窗'
                            checkboxData={{
                                checked: true,
                                text: '记住密码'
                            }}
                            buttons={[
                                {
                                    text: '取消',
                                    style: { color: 'lightpink' },
                                    callback: _ => this.setState({ visible10: false })
                                },
                                {
                                    text: '保存',
                                    style: { color: 'lightblue' },
                                    callback: result => {
                                        console.log(`结果`, result);
                                        this.setState({ visible10: false });
                                    }
                                },
                            ]}
                            onDismiss={_ => this.onDismiss('10')}
                        />
                        <InputDialog
                            visible={this.state.visible11}
                            type={InputDialog.TYPE.BOTH}
                            color='#f0ac3d'
                            title='多TextInput复杂输入弹窗'
                            underlineData={{
                                leftText: '请输入你的ID',
                                underlineText: '还没有ID？注册一个',
                                onPress: _ => alert('你注册的ID是123456')
                            }}
                            inputs={this.state.inputs}
                            checkboxData={this.state.checkboxData}
                            buttons={[
                                {
                                    text: '取消',
                                    style: { color: 'lightpink' },
                                    callback: _ => this.setState({ visible11: false })
                                },
                                {
                                    text: '保存',
                                    style: { color: 'lightblue' },
                                    callback: result => {
                                        console.log(`结果`, result);
                                        this.setState({ visible11: false });
                                    }
                                },
                            ]}
                            onDismiss={_ => this.onDismiss('11')}
                        />
                        <PinCodeDialog
                            visible={this.state.visible12}
                            title='密码/验证码弹窗'
                            message={testText}
                            digit={6}
                            color='#f0ac3d'
                            checkboxData={this.state.checkboxData}
                            buttons={[
                                {
                                    text: '确定',
                                    style: { color: 'lightblue' },
                                    callback: result => {
                                        console.log(`结果`, result);
                                        this.setState({ visible12: false });
                                    }
                                },
                            ]}
                            onDismiss={_ => this.onDismiss('12')}
                        />
                        <ShareDialog
                            visible={this.state.visible13}
                            title='不分页的分享弹窗'
                            onDismiss={_ => this.onDismiss('13')}
                        />
                        <ShareDialog
                            visible={this.state.visible14}
                            title='分页的分享弹窗'
                            options={
                                Array.from({ length: 15 }, (v, i) => ({
                                    icon: testIcon,
                                    text: [`米家`, `微信`, `QQ`, `微博`, `朋友圈`, `收藏`, `即刻`][~~(Math.random() * 7)],
                                    callback: () => console.log('分享成功')
                                }))
                            }
                            onDismiss={_ => this.onDismiss('14')}
                        />
                        <ActionSheet
                            visible={this.state.visible15}
                            options={[
                                {
                                    title: '🙈',
                                    subtitle: '🙈',
                                    onPress: _ => console.log('非礼勿视')
                                },
                                {
                                    title: '🙉',
                                    onPress: _ => console.log('非礼勿听')
                                },
                                {
                                    title: '🙊',
                                    subtitle: '🙊',
                                    onPress: _ => console.log('非礼勿言')
                                }
                            ]}
                            buttons={[
                                {
                                    text: '取消',
                                    style: { color: 'lightblue' },
                                    callback: _ => this.setState({ visible15: false })
                                }
                            ]}
                            onDismiss={_ => this.onDismiss('15')}
                        />
                        <ChoiceDialog
                            visible={this.state.visible16}
                            title={'单选弹窗'}
                            options={[
                                {
                                    title: 'Test',
                                    subtitle: 'test',
                                },
                                {
                                    title: 'Test',
                                },
                                {
                                    title: '测试',
                                    subtitle: '测试',
                                }
                            ]}
                            selectedIndexArray={this.state.selectedIndexArray}
                            onDismiss={_ => this.onDismiss('16')}
                            onSelect={result => this.state.selectedIndexArray = result}
                        />
                        <ChoiceDialog
                            type={ChoiceDialog.TYPE.MULTIPLE}
                            visible={this.state.visible17}
                            title={'多选弹窗'}
                            options={[
                                {
                                    title: '🙈',
                                    subtitle: '🙈',
                                },
                                {
                                    title: '🙉',
                                    subtitle: '🙉',
                                },
                                {
                                    title: '🙊',
                                    subtitle: '🙊',
                                }
                            ]}
                            selectedIndexArray={this.state.selectedIndexArray1}
                            color="#f0ac3d"
                            buttons={[
                                {
                                    text: '保存',
                                    style: { color: 'lightblue' },
                                    callback: result => {
                                        console.log(`选中的选项`, result);
                                        this.setState({
                                            visible17: false,
                                            selectedIndexArray1: result
                                        });
                                    }
                                }
                            ]}
                            onDismiss={_ => this.onDismiss('17')}
                        />
                    </View>
                </ScrollView>
            </View >
        );
    }

    componentDidMount() {
        setTimeout(_ => this.setState({
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
                    onChangeText: text => console.log('用户名是', text)
                },
                {
                    placeholder: 'password',
                    defaultValue: '456',
                    onChangeText: text => console.log('密码是', text)
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
        this.state['visible' + index] = false;
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
});