import React, { Component } from 'react';
import { View, Text, StyleSheet, SectionList, StatusBar, Dimensions } from 'react-native';
import defaultTheme from './mhuiColor';
import { dynamicColor } from "miot/ui";

const { width: screenWidth } = Dimensions.get('window');

const SECTION_MARGIN = 12;
const CARD_MARGIN = 8;
const ITEM_MARGIN = 12;
const NUM_COLUMNS = 4;
const BOX_MARGIN = 4;
const COLOR_BOX_WIDTH = (screenWidth - SECTION_MARGIN * 2 - CARD_MARGIN * 2 - BOX_MARGIN * 2 * NUM_COLUMNS) / NUM_COLUMNS;

class ColorDemo extends Component {
  constructor(props) {
    super(props);
    this.colorData = [
      {
        title: '灰度-文字色',
        data: [
          { id: '1', name: 'Text 1', color: defaultTheme.mjColorGrayText1 },
          { id: '2', name: 'Text 2', color: defaultTheme.mjColorGrayText2 },
          { id: '3', name: 'Text 3', color: defaultTheme.mjColorGrayText3 },
          { id: '4', name: 'Text 4', color: defaultTheme.mjColorGrayText4 },
          { id: '5', name: 'Text 5', color: defaultTheme.mjColorGrayText5 },
          { id: '6', name: 'Text 6', color: defaultTheme.mjColorGrayText6 }
        ]
      },
      {
        title: '灰度-填充色',
        data: [
          {
            subgroup: '灰度-背景色',
            items: [
              { id: '7', name: 'Bg 1', color: defaultTheme.mjColorGrayBg1 },
              { id: '8', name: 'Bg 2', color: defaultTheme.mjColorGrayBg2 }
            ]
          },
          {
            subgroup: '灰度-卡片色',
            items: [
              { id: '9', name: 'Card 1', color: defaultTheme.mjColorGrayCard1 },
              { id: '10', name: 'Card 2', color: defaultTheme.mjColorGrayCard2 },
              { id: '11', name: 'Card 3', color: defaultTheme.mjColorGrayCard3 },
              { id: '12', name: 'Card 4', color: defaultTheme.mjColorGrayCard4 }
            ]
          },
          {
            subgroup: '灰度-填充',
            items: [
              { id: '13', name: 'Tab', color: defaultTheme.mjColorGrayTab },
              { id: '14', name: 'Dialog 1', color: defaultTheme.mjColorGrayDialog1 },
              { id: '15', name: 'Dialog 2', color: defaultTheme.mjColorGrayDialog2 },
              { id: '16', name: 'Fill 1', color: defaultTheme.mjColorGrayFill1 },
              { id: '17', name: 'Fill 2', color: defaultTheme.mjColorGrayFill2 },
              { id: '18', name: 'Fill 3', color: defaultTheme.mjColorGrayFill3 },
              { id: '19', name: 'Fill 4', color: defaultTheme.mjColorGrayFill4 },
              { id: '20', name: 'Popover', color: defaultTheme.mjColorGrayPopover }
            ]
          },
          {
            subgroup: '灰度-其他',
            items: [
              { id: '21', name: 'Switch Fill 1', color: defaultTheme.mjColorGraySwitchFill1 },
              { id: '22', name: 'Switch Fill 2', color: defaultTheme.mjColorGraySwitchFill2 }
            ]
          }
        ]
      },
      {
        title: '灰度-分割线',
        data: [
          { id: '23', name: 'Divider 1', color: defaultTheme.mjColorGrayDivider1 },
          { id: '24', name: 'Divider 2', color: defaultTheme.mjColorGrayDivider2 }
        ]
      },
      {
        title: '灰度-蒙层',
        data: [
          { id: '25', name: 'Mask', color: defaultTheme.mjColorGrayMask }
        ]
      },
      {
        title: '灰度-常量色',
        data: [
          {
            subgroup: '常量黑色',
            items: [
              { id: '26', name: 'mj_color_norm_black', color: defaultTheme.mjColorNormBlack },
              { id: '27', name: 'mj_color_norm_black_80', color: defaultTheme.mjColorNormBlack80 },
              { id: '28', name: 'mj_color_norm_black_50', color: defaultTheme.mjColorNormBlack50 },
              { id: '29', name: 'mj_color_norm_black_40', color: defaultTheme.mjColorNormBlack40 },
              { id: '30', name: 'mj_color_norm_black_30', color: defaultTheme.mjColorNormBlack30 },
              { id: '31', name: 'mj_color_norm_black_10', color: defaultTheme.mjColorNormBlack10 }
            ]
          },
          {
            subgroup: '常量白色',
            items: [
              { id: '32', name: 'mj_color_norm_white', color: defaultTheme.mjColorNormWhite10 },
              { id: '33', name: 'mj_color_norm_white_70', color: defaultTheme.mjColorNormWhite70 },
              { id: '34', name: 'mj_color_norm_white_60', color: defaultTheme.mjColorNormWhite60 },
              { id: '35', name: 'mj_color_norm_white_50', color: defaultTheme.mjColorNormWhite50 },
              { id: '36', name: 'mj_color_norm_white_40', color: defaultTheme.mjColorNormWhite40 },
              { id: '37', name: 'mj_color_norm_white_30', color: defaultTheme.mjColorNormWhite30 },
              { id: '38', name: 'mj_color_norm_white_20', color: defaultTheme.mjColorNormWhite20 },
              { id: '39', name: 'mj_color_norm_white_15', color: defaultTheme.mjColorNormWhite15 },
              { id: '40', name: 'mj_color_norm_white_10', color: defaultTheme.mjColorNormWhite10 }
            ]
          }
        ]
      },
      {
        title: '功能-品牌填充',
        data: [
          { id: '40', name: 'mj_color_function_brandfill_normal', color: defaultTheme.mjColorFunctionBrandfillNormal },
          { id: '41', name: 'mj_color_function_brandfill_secondary_normal ', color: defaultTheme.mjColorFunctionBrandfillSecondaryNormal },
          { id: '42', name: 'mj_color_function_brandfill_disable ', color: defaultTheme.mjColorFunctionBrandfillDisable }
        ]
      },
      {
        title: '功能-品牌线性',
        data: [
          { id: '43', name: 'Text 1', color: defaultTheme.mjColorFunctionBrandtextNormal }
        ]
      },
      {
        title: '功能-系统1',
        data: [
          { id: '44', name: 'mj_color_function_system_normal', color: defaultTheme.mjColorFunctionSystemNormal },
          { id: '45', name: 'mj_color_function_secondary_system_normal', color: defaultTheme.mjColorFunctionSecondarySystemNormal }
        ]
      },
      {
        title: '功能-系统2',
        data: [
          { id: '46', name: 'mj_color_function_main_normal', color: defaultTheme.mjColorFunctionMainNormal },
          { id: '47', name: 'mj_color_function_main_secondary_normal', color: defaultTheme.mjColorFunctionMainSecondaryNormal }
        ]
      },
      {
        title: '功能-异常',
        data: [
          { id: '48', name: 'mj_color_function_error_normal', color: defaultTheme.mjColorFunctionErrorNormal },
          { id: '49', name: 'mj_color_function_error_disable', color: defaultTheme.mjColorFunctionErrorDisable }
        ]
      },
      {
        title: '功能-警告',
        data: [
          { id: '50', name: 'mj_color_function_warn_normal', color: defaultTheme.mjColorFunctionWarnNormal },
          { id: '51', name: 'mj_color_function_warn_disable ', color: defaultTheme.mjColorFunctionWarnDisable }
        ]
      },
      {
        title: '列表-按压态',
        data: [
          { id: '52', name: 'mj_color_list_press', color: defaultTheme.mjColorListPress }
        ]
      }
    ];

    this.sectionCards = this.colorData.map((section) => ({
      title: section.title,
      data: [section.data]
    }));
  }

  renderCard = (boxes, sectionTitle) => {
    // 处理常量色分组
    if (sectionTitle === '灰度-常量色' || sectionTitle === '灰度-填充色') {
      return (
        <View style={styles.cardContainer}>
          {boxes.map((group) => (
            <View key={group.subgroup}>
              <View style={styles.rowContainer}>
                {group.items.map((item) => (
                  <View key={item.id} style={styles.colorBoxWrapper}>
                    <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      );
    }

    // 处理其他 section
    const rows = [];
    for (let i = 0; i < boxes.length; i += NUM_COLUMNS) {
      rows.push(boxes.slice(i, i + NUM_COLUMNS));
    }

    return (
      <View style={styles.cardContainer}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.rowContainer}>
            {row.map((item) => {
              if (sectionTitle === '灰度-文字色' || sectionTitle === '功能-品牌线性') {
                return (
                  <View key={item.id} style={styles.textBox}>
                    <Text style={[styles.demoText, { color: item.color }]}>{item.name}</Text>
                  </View>
                );
              } else if (sectionTitle === '灰度-分割线') {
                return (
                  <View key={item.id} style={styles.dividerBox}>
                    <View style={[styles.dividerLine, { backgroundColor: item.color }]} />
                  </View>
                );
              } else {
                return (
                  <View key={item.id} style={styles.colorBoxWrapper}>
                    <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                  </View>
                );
              }
            })}
          </View>
        ))}
      </View>
    );
  };

  renderSectionHeader = ({ section }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionHeader}>{section.title}</Text>
    </View>
  );

  renderItem = ({ item, section }) => this.renderCard(item, section.title);

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SectionList
          sections={this.sectionCards}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: defaultTheme.mjColorFunctionSecondarySystemNormal },

  sectionContainer: {
    marginHorizontal: SECTION_MARGIN,
    marginTop: 16,
    marginBottom: 8
  },

  sectionHeader: {
    marginHorizontal: CARD_MARGIN,
    fontSize: 18,
    fontWeight: '600',
    color: '#262626'
  },

  cardContainer: {
    marginHorizontal: CARD_MARGIN,
    marginBottom: ITEM_MARGIN
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: BOX_MARGIN * 2,
    marginHorizontal: CARD_MARGIN
  },

  colorBoxWrapper: {
    width: COLOR_BOX_WIDTH,
    marginHorizontal: BOX_MARGIN,
    marginBottom: 0,
    alignItems: 'center'
  },

  colorBox: {
    width: COLOR_BOX_WIDTH,
    height: 59,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: BOX_MARGIN
  },

  textBox: {
    width: COLOR_BOX_WIDTH,
    height: 59,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: BOX_MARGIN
  },

  demoText: {
    fontSize: 16,
    fontWeight: '500'
  },

  colorName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#262626',
    textAlign: 'center'
  },

  dividerBox: {
    width: COLOR_BOX_WIDTH,
    height: 59,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: BOX_MARGIN
  },

  dividerLine: {
    width: COLOR_BOX_WIDTH,
    height: 2,
    marginVertical: 20
  },

  subgroupHeader: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 8,
    marginLeft: 8,
    color: '#333'
  }
});

export default ColorDemo;
