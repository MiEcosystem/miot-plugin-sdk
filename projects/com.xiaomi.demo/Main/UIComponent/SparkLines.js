import React from "react";
import SparkLines from "miot/ui/Sparkline";

import { ScrollView, View, Text, StyleSheet } from "react-native";

export default class StringSpinnerDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      result: 2,
      lines: [
        {
          value: [
            {
              data: new Array(9).fill(175).map((v) => Math.random() * v), // 此处包括以下用例为随机生成数据
              name: "a",
              gradient: ["#00B7A2", "#FFA943", "#FC675F"], // 配置渐变色
              range: "yAxis", // 渐变应用方式，按照y轴数据渐变为yAxis（需要同时配置offset）
              offset: [
                // 每一个渐变颜色对应的渐变区域的最大最小值，只有单一值的话另一值则为无穷
                { min: 150 },
                { max: 150, min: 75 },
                { min: 0, max: 75 }
              ]
              // direction字段可配置渐变方向
            }
          ],
          labels: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月"
          ], // x轴坐标文字
          unit: "μg/m³", // 选中数据单位
          title: "空气净化器 要求样式", // 曲线标题
          type: "line", // 曲线图line或柱状图bar
          status: "normal", // 正在加载loading、加载失败error、空数据empty、正常状态normal
          smooth: true, // 是否平滑
          selectType: "line", // 选中数据状态样式为直线
          visual: [
            { name: "优", color: "#00B7A2" },
            { name: "良", color: "#FFA943" },
            { name: "差", color: "#FC675F" }
          ],
          fixed: 2, // 选中数据保留小数位数
          scale: false // y轴是否按照数值缩放
        },
        {
          value: [
            {
              data: new Array(9).fill(175).map((v) => Math.random() * v + v),
              name: "b",
              gradient: ["#00B7A2", "#FFA943", "#FC675F"],
              range: "line", // 渐变颜色应用在曲线所在范围内，global则为整个y轴范围
              format: (v) => `${ v.replace(v[1], Number(v[1]) - 1) }-${ v } 最高` // 选中数据提示文字格式化函数
            },
            {
              data: new Array(9).fill(175).map((v) => Math.random() * v),
              name: "c",
              gradient: ["#00B7A2", "#FFA943", "#FC675F"],
              range: "line",
              format: (v) => `${ v.replace(v[1], Number(v[1]) - 1) }-${ v } 最低`
            }
          ],
          labels: [
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00"
          ],
          unit: "μg/m³",
          title: "无叶净化器要求样式",
          type: "line",
          status: "normal",
          smooth: true,
          selectType: "shadow", // 选中数据状态样式为阴影
          visual: [
            { name: "优", color: "#00B7A2" },
            { name: "良", color: "#FFA943" },
            { name: "差", color: "#FC675F" }
          ],
          fixed: 2,
          scale: false
        },
        {
          value: [
            {
              data: new Array(9).fill(175).map((v) => Math.random() * v),
              name: "d",
              gradient: ["rgba(69, 180, 255, 0)", "#A9DCFF"],
              color: "#45B4FF", // 填充状态下曲线颜色
              format: "{l} 温度" // 选中数据提示文字格式化，{l}会被替换
            }
          ],
          labels: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月"
          ],
          unit: "℃",
          title: "温湿度要求样式1",
          type: "line",
          status: "normal",
          smooth: true,
          selectType: "line",
          fill: true, // 填充，填充状态下，渐变色自动转化为填充渐变
          fixed: 1,
          scale: false
        },
        {
          value: [
            {
              data: new Array(9).fill(175).map((v) => Math.random() * v + v),
              name: "e",
              gradient: ["#17A0FD"], // 由于样式配置内容繁杂，曲线图单色也用gradient配置
              format: (v) => `${ v.replace(v[1], Number(v[1]) - 1) }-${ v } 最高`
            },
            {
              data: new Array(9).fill(175).map((v) => Math.random() * v),
              name: "f",
              gradient: ["#85CCFD"],
              format: (v) => `${ v.replace(v[1], Number(v[1]) - 1) }-${ v } 最低`
            }
          ],
          labels: [
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00"
          ],
          unit: "℃",
          title: "温湿度要求样式2",
          type: "line",
          status: "normal",
          selectType: "shadow",
          fixed: 0,
          visual: [
            { name: "最高", color: "#17A0FD" },
            { name: "最低", color: "#85CCFD" }
          ]
        },
        {
          value: [
            {
              data: new Array(9).fill(175).map((v) => Math.random() * v),
              name: "g",
              gradient: ["rgba(69, 180, 255, 0)", "#A9DCFF"],
              color: "#45B4FF",
              format: "纯水水质"
            }
          ],
          labels: [
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00"
          ],
          unit: "TDS",
          title: "TDS水质样式要求",
          type: "line",
          status: "normal",
          selectType: "line",
          fixed: 0,
          fill: true
        },
        {
          value: [
            {
              data: new Array(9).fill(175).map((v) => Math.random() * v),
              name: "h",
              gradient: ["rgba(150, 120, 250, 0)", "#9678FA"],
              color: "#9678FA",
              format: "{l}功率"
            }
          ],
          labels: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月"
          ],
          unit: "w",
          title: "功率样式要求",
          type: "line",
          status: "normal",
          selectType: "line",
          fixed: 0,
          scale: false,
          fill: true,
          smooth: true
        },
        {
          value: [
            {
              data: new Array(9).fill(175).map((v) => Math.random() * v + v),
              name: "i",
              color: "#36CF6E",
              gradient: ["rgba(54, 207, 110, 0)", "#36CF6E"],
              format: (v) => `${ v.replace(v[1], Number(v[1]) - 1) }-${ v } 气压值`
            }
          ],
          labels: [
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            "06:00",
            "07:00",
            "08:00",
            "09:00"
          ],
          unit: "KPa",
          title: "气压值要求样式",
          type: "line",
          status: "normal",
          selectType: "shadow",
          fixed: 1,
          scale: false,
          smooth: true,
          fill: true
        },
        {
          value: [
            {
              data: new Array(9).fill(175).map((v) => Math.random() * v),
              name: "j",
              color: "#545AFA",
              format: "{l}用电电量"
            }
          ],
          labels: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月"
          ],
          unit: "KW/h",
          title: "电量统计要求样式",
          type: "bar",
          status: "normal",
          fixed: 1
        },
        {
          value: [
            {
              data: new Array(9).fill(175).map((v) => Math.random() * v),
              name: "k",
              color: "#FFA626",
              format: "{l}用电电量"
            }
          ],
          labels: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月"
          ],
          unit: "KW/h",
          title: "耗电量要求样式",
          type: "bar",
          status: "normal",
          fixed: 1
        },
        {
          value: [
            {
              data: new Array(9).fill(175).map((v) => Math.random() * v + v),
              name: "l",
              color: "#23DEFF",
              format: "{l}用电量"
            },
            {
              data: new Array(9).fill(175).map((v) => Math.random() * v),
              name: "m",
              color: "#08C5FC",
              format: "{l}用电量"
            }
          ],
          labels: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月"
          ],
          unit: "L",
          title: "用水详情要求样式",
          type: "bar",
          status: "normal",
          fixed: 1
        },
        {
          value: [
            {
              data: new Array(9).fill(175).map((v) => Math.random() * v + v),
              name: "n",
              color: "#23DEFF",
              format: "{l}用电量"
            }
          ],
          labels: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月"
          ],
          unit: "L",
          title: "选中文字插槽",
          type: "bar",
          status: "normal",
          fixed: 1,
          itemWidth: 20, // 配置柱状图宽度，默认14，
          onSelect: () => {
            this.setState({ result: this.state.result + 1 });
          },
          yAxisShow: false
        }
      ]
    };
  }

  render() {
    const { lines, result } = this.state;
    const viewslot = (
      <View>
        <View style={styles.row}>
          <Text style={styles.number}>{result}</Text>
          <Text style={styles.unit}>小时</Text>
          <Text style={styles.number}>0</Text>
          <Text style={styles.unit}>分钟</Text>
        </View>
        <Text style={styles.label}>使用时长</Text>
      </View>
    );
    return (
      <ScrollView style={{ flex: 1 }}>
        {lines.map((v, i, a) => (
          <SparkLines
            viewslot={i === a.length - 1 && viewslot}
            key={v.title}
            {...v}
          />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  number: {
    fontFamily: "Xiaomi Prototype 210317",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 30,
    height: 36,
    color: "#000000"
  },
  label: {
    fontStyle: "normal",
    fontSize: 12,
    lineHeight: 16,
    color: "rgba(0, 0, 0, 0.4)",
    textAlign: "right"
  },
  unit: {
    marginLeft: 2,
    fontStyle: "normal",
    fontSize: 12,
    height: 16,
    color: "#000000"
  },
  row: { flexDirection: "row", alignItems: "baseline" }
});
