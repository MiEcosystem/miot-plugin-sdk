import React from "react";
import YMDDatePicker from "miot/ui/YMDDatePicker";
import { ListItem, ListItemWithSwitch } from "miot/ui/ListItem/";
import ChoiceItem from "miot/ui/ListItem/ChoiceItem";

import { ScrollView, View, Text, StyleSheet } from "react-native";

export default class StringSpinnerDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "点击选择日期",
      date: "2021-11-11", // 选择内容，多选和范围选择请使用数组，支持Date对象、时间戳（毫秒）、yyyy-mm-dd等可被new Date正确转换的数据格式，数组时支持混用
      value: "2021-11-11", // 展示在listitem
      SwitchCase: {
        closeImmediately: false,
        multiple: false,
        range: false,
        showWeek: false,
        showAdjacentMonths: false,
        fullscreen: false,
        max: undefined,
        min: undefined,
        allowDates: undefined,
        event: undefined,
        firstDayOfWeek: undefined,
        button: undefined,
        title: undefined,
        readonly: false,
        localeFirstDayOfYear: undefined, // 默认为4，决定一年中第一周的日期，从 0 开始，星期日。对于 ISO 8601，应该是 4
        theme: undefined,
        buttonColor: undefined,
        backgroundColor: undefined,
        panel: undefined,
        hideOverlay: false,
        persistent: true, // 是否可点击遮罩层关闭
        overlayOpacity: undefined,
        overlayColor: undefined
        /*
         onChangePanelBefore: Function;
         onChangePanelTypeBefore: Function;
         */
      },
      subtitle: {
        max: "2021-12-11",
        min: "2021-10-11",
        allowDates: (v) => v.split("-")[2] % 2 === 0,
        event: ["2021-11-10", { date: "2021-11-12", color: "yellow" }],
        firstDayOfWeek: 1,
        button: "选择",
        title: "日期选择器", // 配置false可隐藏title
        panel: "month",
        localeFirstDayOfYear: 1,
        theme: "#fa7298",
        buttonColor: { confirm: "blue", cancel: "#999" },
        backgroundColor: "rgb(255, 234, 239)",
        overlayOpacity: 0.6,
        overlayColor: "red"
      }
    };
  }

  press = (i) => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  select = (v, i) => {
    const { multiple, range } = this.state.SwitchCase;
    let date = v;
    let value = "";
    if (multiple) value = v.join(",");
    else if (range) value = v.join("~");
    else value = v;
    this.setState({ value, date });
  };

  switched(k, v) {
    const { SwitchCase, subtitle } = this.state;
    let date = this.state.value;
    SwitchCase[k] = k in subtitle ? (v ? subtitle[k] : undefined) : v;
    if (v && k === "range") {
      SwitchCase.multiple = false;
      date = [date, date];
    } else if (v && k === "multiple") {
      SwitchCase.range = false;
      date = [date];
    }
    this.setState({ SwitchCase: { ...SwitchCase }, date });
  }

  render() {
    const { title, visible, value, date, SwitchCase, subtitle } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        <ListItem title={title} onPress={this.press} value={value} />
        <YMDDatePicker
          visible={visible}
          onSelected={this.select}
          onCancel={() => this.setState({ visible: false })}
          date={date.slice(0, SwitchCase.panel === "month" ? 7 : 11)}
          {...SwitchCase}
        />
        {Object.keys(SwitchCase).map((k) => (
          <ListItemWithSwitch
            key={k}
            title={k}
            value={
              k in subtitle
                ? SwitchCase[k] === subtitle[k]
                : Boolean(SwitchCase[k])
            }
            subtitle={k in subtitle && JSON.stringify(subtitle[k])}
            onValueChange={(v) => this.switched(k, v)}
          />
        ))}
      </ScrollView>
    );
  }
}
