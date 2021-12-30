import React from "react";
import { Tabs, Tab } from "miot/ui/tab";

import { ScrollView, View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { ListItemWithSwitch, ListItem } from "miot/ui/ListItem/";

export default class StringSpinnerDemo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      tab: {
        icon: undefined,
        color: undefined,
        activeIcon: undefined,
        activeStyle: undefined
      },
      tabs: {
        position: undefined,
        grow: false,
        height: undefined,
        hideSlider: false,
        backgroundColor: undefined,
        centerActive: false,
        color: undefined,
        sliderColor: undefined,
        sliderSize: undefined,
        sliderType: undefined,
        activeStyle: undefined
      },
      subtitle: {
        height: 60,
        backgroundColor: "rgb(255, 234, 239)",
        color: "#fa7298",
        sliderColor: "cyan",
        sliderSize: 6,
        sliderType: "rect",
        activeStyle: { backgroundColor: "#ccc" }
      },
      items: ["AAA", "BBBBBB", "CCCCCCCCC"]
    };
  }
  switched(k, v) {
    const { tabs, subtitle } = this.state;
    tabs[k] = k in subtitle ? (v ? subtitle[k] : undefined) : v;
    if (v && k === "grow") {
      tabs.position = undefined;
      tabs.centerActive = false;
    } else if (v && k === "position") {
      tabs.grow = false;
      tabs.centerActive = false;
    } else if (v && k === "centerActive") {
      tabs.grow = false;
      tabs.position = undefined;
    }

    this.setState({ tabs: { ...tabs } });
  }
  render() {
    const { tabs, subtitle, value, items, tab } = this.state;
    const Key = "position";
    return (
      <ScrollView style={{ flex: 1 }}>
        <Tabs
          {...tabs}
          onSelect={(i) => this.setState({ value: i })}
          value={value}
        >
          {items.map((v, i) => (
            <Tab
              activeStyle={i === 0 && tab.activeStyle}
              disabled={i === 1 && tab.disabled}
              color={i === 2 && tab.color}
              key={v}
              icon={tab.icon}
              activeIcon={tab.activeIcon}
            >
              {v}
            </Tab>
          ))}
        </Tabs>
        <ListItemWithSwitch
          title="Much Tab"
          value={items.length > 3}
          subtitle="Tab内容宽超出屏幕宽度下grow和position失效"
          onValueChange={(v) =>
            this.setState({
              items: v
                ? items
                  .slice(0, 3)
                  .concat(["DDD", "EEE", "FFF", "GGG", "HHH", "III"])
                : items.slice(0, 3)
            })
          }
        />
        <Text style={{ padding: 10 }}>Tabs相关属性</Text>
        <ListItemWithSwitch
          title={Key}
          value={tabs[Key] === "flex-end"}
          subtitle="flex-end"
          onValueChange={(v) => this.switched(Key, v ? "flex-end" : undefined)}
        />
        <ListItemWithSwitch
          title={Key}
          value={tabs[Key] === "center"}
          subtitle="flex-end"
          onValueChange={(v) => this.switched(Key, v ? "center" : undefined)}
        />
        {Object.keys(tabs).map(
          (k) =>
            k !== Key && (
              <ListItemWithSwitch
                key={k}
                title={k}
                value={
                  k in subtitle ? tabs[k] === subtitle[k] : Boolean(tabs[k])
                }
                subtitle={k in subtitle && JSON.stringify(subtitle[k])}
                onValueChange={(v) => this.switched(k, v)}
              />
            )
        )}
        <ListItem
          hideArrow
          title="value"
          subtitle="初始化时配置默认选中，后需更改将不再生效"
          value={value.toString()}
        />
        <Text style={{ padding: 10 }}>Tab相关属性</Text>
        <Text style={{ paddingHorizontal: 10, fontSize: 10 }}>
          只单独有icon时选中态按照默认色
        </Text>
        <ListItemWithSwitch
          title="icon"
          value={Boolean(tab.icon)}
          subtitle={tab.icon}
          onValueChange={(v) =>
            this.setState({
              tab: {
                ...tab,
                icon: v ? (
                  <Svg width="20" height="20">
                    <Circle x="10" y="10" r="6" />
                  </Svg>
                ) : undefined
              }
            })
          }
        />
        <ListItemWithSwitch
          title="activeIcon"
          value={Boolean(tab.activeIcon)}
          subtitle={tab.activeIcon}
          onValueChange={(v) =>
            this.setState({
              tab: {
                ...tab,
                icon: v ? (
                  <Svg width="20" height="20">
                    <Circle x="10" y="10" r="6" fill="rgb(255, 234, 239)" />
                  </Svg>
                ) : (
                  tab.icon
                ),
                activeIcon: v ? (
                  <Svg width="20" height="20">
                    <Circle x="10" y="10" r="6" fill="#fa7298" />
                  </Svg>
                ) : undefined
              }
            })
          }
        />
        <ListItemWithSwitch
          title="disabled"
          value={Boolean(tab.disabled)}
          subtitle="此处仅给第1项设置disabled"
          onValueChange={(v) => this.setState({ tab: { ...tab, disabled: v } })}
        />
        <ListItemWithSwitch
          title="color"
          value={Boolean(tab.color)}
          subtitle="此处仅给第2项设置color为blue"
          onValueChange={(v) =>
            this.setState({ tab: { ...tab, color: v ? "blue" : undefined } })
          }
        />
        <ListItemWithSwitch
          title="activeStyle"
          value={Boolean(tab.activeStyle)}
          subtitle="此处仅给第0项设置activeStyle为{ textAlign: 'left' }"
          onValueChange={(v) =>
            this.setState({
              tab: {
                ...tab,
                activeStyle: v ? { textAlign: "left" } : undefined
              }
            })
          }
        />
      </ScrollView>
    );
  }
}
