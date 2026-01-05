import React, { Component } from 'react';
import { View, Text, SectionList, StatusBar, Dimensions } from 'react-native';
import { colorToken } from 'miot/ui/hyperOSUI';
import { dynamicStyleSheet } from 'miot/ui/Style';

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
        showType: 3,
        data: [
          { name: 'Text 1', color: colorToken.mj_color_gray_text_1 },
          { name: 'Text 2', color: colorToken.mj_color_gray_text_2 },
          { name: 'Text 3', color: colorToken.mj_color_gray_text_3 },
          { name: 'Text 4', color: colorToken.mj_color_gray_text_4 },
          { name: 'Text 5', color: colorToken.mj_color_gray_text_5 },
          { name: 'Text 6', color: colorToken.mj_color_gray_text_6 },
          { name: 'Text 7', color: colorToken.mj_color_gray_text_7 },
          { name: 'Text 8', color: colorToken.mj_color_gray_text_8 }
        ]
      },
      {
        title: '灰度-图标色',
        showType: 1,
        data: [
          { name: 'Icon 1', color: colorToken.mj_color_gray_icon_1 },
          { name: 'Icon 2', color: colorToken.mj_color_gray_icon_2 },
          { name: 'Icon 2 Press', color: colorToken.mj_color_gray_icon_2_press },
          { name: 'Icon 2 Dis', color: colorToken.mj_color_gray_icon_2_dis },
          { name: 'Icon 3', color: colorToken.mj_color_gray_icon_3 },
          { name: 'Icon 4', color: colorToken.mj_color_gray_icon_4 },
          { name: 'Icon 5', color: colorToken.mj_color_gray_icon_5 },
          { name: 'Icon 6', color: colorToken.mj_color_gray_icon_6 },
          { name: 'Icon 7', color: colorToken.mj_color_gray_icon_7 },
          { name: 'Icon 8', color: colorToken.mj_color_gray_icon_8 }
        ]
      },
      {
        title: '灰度-填充色',
        showType: 2,
        data: [
          {
            subgroup: '灰度-背景色',
            items: [
              { name: 'mj_color_gray_bg_1', color: colorToken.mj_color_gray_bg_1 },
              { name: 'mj_color_gray_bg_2', color: colorToken.mj_color_gray_bg_2 }
            ]
          },
          {
            subgroup: '灰度-卡片色',
            items: [
              { name: 'mj_color_gray_card_1', color: colorToken.mj_color_gray_card_1 },
              { name: 'mj_color_gray_card_2', color: colorToken.mj_color_gray_card_2 },
              { name: 'mj_color_gray_card_3', color: colorToken.mj_color_gray_card_3 },
              { name: 'mj_color_gray_card_4', color: colorToken.mj_color_gray_card_4 }
            ]
          },
          {
            subgroup: '灰度-填充',
            items: [
              { name: 'Tab', color: colorToken.mj_color_gray_tab },
              { name: 'Dialog 1', color: colorToken.mj_color_gray_dialog_1 },
              { name: 'Dialog 2', color: colorToken.mj_color_gray_dialog_2 },
              { name: 'Fill 1', color: colorToken.mj_color_gray_fill_1 },
              { name: 'Fill 2', color: colorToken.mj_color_gray_fill_2 },
              { name: 'Fill 3', color: colorToken.mj_color_gray_fill_3 },
              { name: 'Fill 4', color: colorToken.mj_color_gray_fill_4 },
              { name: 'Fill 5', color: colorToken.mj_color_gray_fill_5 },
              { name: 'Popover', color: colorToken.mj_color_gray_popover }
            ]
          },
          {
            subgroup: '灰度-其他',
            items: [
              { name: 'mj_color_gray_switch_fill_1', color: colorToken.mj_color_gray_switch_fill_1 },
              { name: 'mj_color_gray_switch_fill_2', color: colorToken.mj_color_gray_switch_fill_2 }
            ]
          }
        ]
      },
      {
        title: '灰度-分割线',
        showType: 4,
        data: [
          { name: 'mj_color_gray_divider_1', color: colorToken.mj_color_gray_divider_1 },
          { name: 'mj_color_gray_divider_2', color: colorToken.mj_color_gray_divider_2 }
        ]
      },
      {
        title: '灰度-蒙层',
        showType: 1,
        data: [
          { name: 'mj_color_gray_mask', color: colorToken.mj_color_gray_mask }
        ]
      },
      {
        title: '灰度-常量色',
        showType: 2,
        data: [
          {
            subgroup: '常量黑色',
            items: [
              { name: 'mj_color_norm_black', color: colorToken.mj_color_norm_black },
              { name: 'mj_color_norm_black_80', color: colorToken.mj_color_norm_black_80 },
              { name: 'mj_color_norm_black_50', color: colorToken.mj_color_norm_black_50 },
              { name: 'mj_color_norm_black_40', color: colorToken.mj_color_norm_black_40 },
              { name: 'mj_color_norm_black_30', color: colorToken.mj_color_norm_black_30 },
              { name: 'mj_color_norm_black_10', color: colorToken.mj_color_norm_black_10 }
            ]
          },
          {
            subgroup: '常量白色',
            items: [
              { name: 'mj_color_norm_white', color: colorToken.mj_color_norm_white },
              { name: 'mj_color_norm_white_80', color: colorToken.mj_color_norm_white_80 },
              { name: 'mj_color_norm_white_70', color: colorToken.mj_color_norm_white_70 },
              { name: 'mj_color_norm_white_60', color: colorToken.mj_color_norm_white_60 },
              { name: 'mj_color_norm_white_50', color: colorToken.mj_color_norm_white_50 },
              { name: 'mj_color_norm_white_40', color: colorToken.mj_color_norm_white_40 },
              { name: 'mj_color_norm_white_30', color: colorToken.mj_color_norm_white_30 },
              { name: 'mj_color_norm_white_20', color: colorToken.mj_color_norm_white_20 },
              { name: 'mj_color_norm_white_15', color: colorToken.mj_color_norm_white_15 },
              { name: 'mj_color_norm_white_10', color: colorToken.mj_color_norm_white_10 }
            ]
          }
        ]
      },
      {
        title: '灰度-彩色',
        showType: 2,
        data: [
          {
            subgroup: '常量黄色',
            items: [
              { name: 'mjcard_color_yellow_1', color: colorToken.mjcard_color_yellow_1 },
              { name: 'mjcard_color_yellow_2', color: colorToken.mjcard_color_yellow_2, isText: true },
              { name: 'mjcard_color_yellow_3', color: colorToken.mjcard_color_yellow_3 },
              { name: 'mjcard_color_yellow_4', color: colorToken.mjcard_color_yellow_4 }
            ]
          },
          {
            subgroup: '常量蓝色',
            items: [
              { name: 'mjcard_color_blue_1', color: colorToken.mjcard_color_blue_1 },
              { name: 'mjcard_color_blue_2', color: colorToken.mjcard_color_blue_2, isText: true },
              { name: 'mjcard_color_blue_3', color: colorToken.mjcard_color_blue_3 },
              { name: 'mjcard_color_blue_4', color: colorToken.mjcard_color_blue_4 }
            ]
          },
          {
            subgroup: '常量绿色',
            items: [
              { name: 'mjcard_color_green_1', color: colorToken.mjcard_color_green_1 },
              { name: 'mjcard_color_green_2', color: colorToken.mjcard_color_green_2, isText: true },
              { name: 'mjcard_color_green_3', color: colorToken.mjcard_color_green_3 },
              { name: 'mjcard_color_green_4', color: colorToken.mjcard_color_green_4 }
            ]
          },
          {
            subgroup: '常量橙色',
            items: [
              { name: 'mjcard_color_orange_1', color: colorToken.mjcard_color_orange_1 },
              { name: 'mjcard_color_orange_2', color: colorToken.mjcard_color_orange_2, isText: true },
              { name: 'mjcard_color_orange_3', color: colorToken.mjcard_color_orange_3 },
              { name: 'mjcard_color_orange_4', color: colorToken.mjcard_color_orange_4 }
            ]
          },
          {
            subgroup: '常量浅蓝色',
            items: [
              { name: 'mjcard_color_wathet_1', color: colorToken.mjcard_color_wathet_1 },
              { name: 'mjcard_color_wathet_2', color: colorToken.mjcard_color_wathet_2, isText: true },
              { name: 'mjcard_color_wathet_3', color: colorToken.mjcard_color_wathet_3 },
              { name: 'mjcard_color_wathet_4', color: colorToken.mjcard_color_wathet_4 }
            ]
          },
          {
            subgroup: '常量紫色',
            items: [
              { name: 'mjcard_color_purple_1', color: colorToken.mjcard_color_purple_1 },
              { name: 'mjcard_color_purple_2', color: colorToken.mjcard_color_purple_2, isText: true },
              { name: 'mjcard_color_purple_3', color: colorToken.mjcard_color_purple_3 },
              { name: 'mjcard_color_purple_4', color: colorToken.mjcard_color_purple_4 }
            ]
          },
          {
            subgroup: '常量红色',
            items: [
              { name: 'mjcard_color_red_1', color: colorToken.mjcard_color_red_1 },
              { name: 'mjcard_color_red_2', color: colorToken.mjcard_color_red_2, isText: true },
              { name: 'mjcard_color_red_3', color: colorToken.mjcard_color_red_3 },
              { name: 'mjcard_color_red_4', color: colorToken.mjcard_color_red_4 }
            ]
          },
          {
            subgroup: '常量miui色',
            items: [
              { name: 'mjcard_color_miui_1', color: colorToken.mjcard_color_miui_1 },
              { name: 'mjcard_color_miui_2', color: colorToken.mjcard_color_miui_2, isText: true },
              { name: 'mjcard_color_miui_3', color: colorToken.mjcard_color_miui_3 },
              { name: 'mjcard_color_miui_4', color: colorToken.mjcard_color_miui_4 }
            ]
          }
        ]
      },
      {
        title: '列表-按压态',
        showType: 1,
        data: [
          { name: 'mj_color_btn_press', color: colorToken.mj_color_btn_press },
          { name: 'mj_color_list_press', color: colorToken.mj_color_list_press }
        ]
      }
    ];

    this.sectionCards = this.colorData.map((section) => ({
      showType: section.showType,
      title: section.title,
      data: [section.data]
    }));
  }
  renderCard = (boxes, showType) => {
    // 处理常量色分组
    if (showType === 2) {
      return (
        <View style={styles.cardContainer}>
          {boxes.map((group) => (
            <View key={group.subgroup}>
              <View style={styles.rowContainer}>
                {group.items.map((item) => (
                  <View key={item.name} style={styles.colorBoxWrapper}>
                    {
                      item.isText 
                        ? <Text style={{ color: item.color }} >text 1</Text>
                        : <View style={[styles.colorBox, { backgroundColor: item.color }]} />
                    }
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
              if (showType === 3) {
                return (
                  <View key={item.name} style={styles.textBox}>
                    <Text style={[styles.demoText, { color: item.color }]}>{item.name}</Text>
                  </View>
                );
              } else if (showType === 4) {
                return (
                  <View key={item.name} style={styles.dividerBox}>
                    <View style={[styles.dividerLine, { backgroundColor: item.color }]} />
                  </View>
                );
              } else {
                return (
                  <View key={item.name} style={styles.colorBoxWrapper}>
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

  renderItem = ({ item, section }) => {
    return this.renderCard(item, section.showType); 
  };

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

const styles = dynamicStyleSheet({
  container: { flex: 1, backgroundColor: colorToken.mj_color_gray_bg_2 },

  sectionContainer: {
    marginHorizontal: SECTION_MARGIN,
    marginTop: 16,
    marginBottom: 8
  },

  sectionHeader: {
    marginHorizontal: CARD_MARGIN,
    fontSize: 18,
    fontWeight: '600',
    color: colorToken.mjcard_color_miui_1
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
    alignItems: 'center',
    justifyContent: 'center'
  },

  colorBox: {
    width: COLOR_BOX_WIDTH,
    height: 59,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colorToken.mj_color_gray_divider_1,
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
    borderColor: colorToken.mj_color_gray_divider_1,
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
    color: colorToken.mj_color_gray_card_1,
    textAlign: 'center'
  },

  dividerBox: {
    width: COLOR_BOX_WIDTH,
    height: 59,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colorToken.mj_color_gray_divider_1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: BOX_MARGIN
  },

  dividerLine: {
    width: COLOR_BOX_WIDTH,
    height: 2,
    marginVertical: 20
  }
});

export default ColorDemo;
