import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RkPicker, RkText, RkTheme } from 'react-native-ui-kitten';
import { UtilStyles } from '../style/styles';
const { width } = Dimensions.get('window');


export class PickerScreen extends React.Component {
  static navigationOptions = {
    title: 'Selectable components'
  };

  constructor(props) {
    super(props);
    this.state = {
      settingsOption: {
        index: 0,
        name: 'Option 1'
      },
      pikerVisible: false,
      pickedValue: [{ key: 8, value: 'Aug' }, 26, 2017]
    };
    this.hidePicker = this.hidePicker.bind(this);
    this.handlePickedValue = this.handlePickedValue.bind(this);
  }

  showPicker() {
    this.setState({ pikerVisible: true })
  };

  hidePicker() {
    this.setState({ pikerVisible: false });
  }

  handlePickedValue(date) {
    this.setState({ pickedValue: date });
    this.hidePicker();
  };

  generateArrayFromRange(start, finish) {
    return Array.apply(null, Array(finish - start + 1)).map((_, i) => {
      return start + i;
      return start + i > 9 ? '' + (start + i) : '0' + (start + i);
    });
  }

  render() {
    let days = this.generateArrayFromRange(1, 31);
    let years = this.generateArrayFromRange(1985, 2025);
    let months = [
      { key: 1, value: 'Jun' }, { key: 2, value: 'Feb' },
      { key: 3, value: 'Mar' }, { key: 4, value: 'Apr' },
      { key: 5, value: 'May' }, { key: 6, value: 'Jun' },
      { key: 7, value: 'Jul' }, { key: 8, value: 'Aug' },
      { key: 9, value: 'Sep' }, { key: 10, value: 'Oct' },
      { key: 11, value: 'Nov' }, { key: 12, value: 'Dec' },
    ];
    const modalWidth = width - 21 * 2;
    const optionHeight = 50;
    const selectHeight = 60;
    const titleHeight = 83;
    const buttonHeight = 55;
    let hours = this.generateArrayFromRange(0, 12);
    let minutes = this.generateArrayFromRange(0, 60);
    RkTheme.setType('RkPicker', 'myRkPicker', {
      modalContentBlock: {
        width: modalWidth,
        borderRadius: 20,
        height: 398,
      },
      titleBlock: {
        width: modalWidth,
        height: titleHeight,
        textAlign: 'center',
        fontSize: 15,
        lineHeight: titleHeight,
        fontFamily: 'PingFang-SC-Medium',
        marginTop: 0,
      },
      listsContainerBlock: {
        width: modalWidth,
      },
      buttonsBlockBlock: {
        marginTop: 0,
      },
      cancelButtonBlock: {
        height: buttonHeight,
      },
      confirmButtonBlock: {
        height: buttonHeight,
      },
      optionListContainer: {
        marginHorizontal: 0,
      },
      highlightBlock: {
        backgroundColor: '#f3f3f3',
        height: selectHeight,
      },
      optionBlock: {
        height: optionHeight,
      },
      highlightBorderTopColor: '#e5e5e5',
      highlightBorderBottomColor: '#e5e5e5',
      highlightBorderTopWidth: 0.5,
      highlightBorderBottomWidth: 0.5
    });
    RkTheme.setType('RkText', 'myOption', {
      fontSize: 16,
      color: '#666',
      height: optionHeight,
      lineHeight: optionHeight,
    });
    RkTheme.setType('RkText', 'mySelect', {
      fontSize: 20,
      color: '#000',
      height: selectHeight,
      lineHeight: selectHeight,
    });
    const basicButtonStyle = {
      fontSize: 14,
      fontFamily: 'PingFang-SC-Medium',
    }
    RkTheme.setType('RkText', 'myCancelText', basicButtonStyle);
    RkTheme.setType('RkText', 'myConfirmText', {
      color: '#00BC9C',
      ...basicButtonStyle,
    });
    return (
      <ScrollView
        style={UtilStyles.container}
        automaticallyAdjustContentInsets={true}>
        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Picker Examples</RkText>
          <View style={UtilStyles.columnContainer}>
            <View style={styles.componentRow}>
              <TouchableOpacity onPress={() => this.showPicker()}>
                <Text>
                  {this.state.pickedValue[0].value}
                  {this.state.pickedValue[1]}
                  {this.state.pickedValue[2]}
                </Text>
              </TouchableOpacity>
              <RkPicker
                rkType='myRkPicker'
                optionRkType='myOption'
                selectedOptionRkType='mySelect'
                optionNumberOnPicker={5}
                title='开启时间'
                confirmButtonText="确定"
                cancelButtonText="取消"
                cancelTextRkType='myCancelText'
                confirmTextRkType='myConfirmText'
                data={[hours, minutes]}
                visible={this.state.pikerVisible}
                onConfirm={this.handlePickedValue}
                onCancel={this.hidePicker}
                selectedOptions={this.state.pickedValue} />
              <RkText rkType='bold' style={styles.caption}>Date Picker</RkText>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  componentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25
  },
  caption: {
    marginLeft: 16
  }
});
