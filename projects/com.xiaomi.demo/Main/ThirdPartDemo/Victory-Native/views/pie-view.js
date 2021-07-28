/* global setInterval */
import React from "react";
import { ScrollView } from "react-native";
import { VictoryPie } from "victory-native";
import viewStyles from "../styles/view-styles";
import { generateRandomData } from "../data";
import Svg from "react-native-svg";

export default class extends React.Component {
  static navigationOptions = {
    headerTitle: "VictoryPie"
  };

  constructor(props) {
    super(props);
    this.state = {
      randomData: generateRandomData()
    };
  }

  componentDidMount() {
    setInterval(this.updateDemoData.bind(this), 3000);
  }

  updateDemoData() {
    this.setState({
      randomData: generateRandomData()
    });
  }

  render() {
    return (
      <ScrollView style={viewStyles.container}>
        <VictoryPie
          innerRadius={75}
          labelRadius={125}
          style={{ labels: { fontSize: 20 } }}
          data={this.state.randomData}
          animate={{ duration: 1500 }}
        />

        <VictoryPie
          style={{
            data: {
              stroke: "none",
              opacity: 0.3
            }
          }}
        />
        <VictoryPie innerRadius={90} />
        <VictoryPie endAngle={90} startAngle={-90} />
        <VictoryPie
          endAngle={90}
          innerRadius={90}
          padAngle={5}
          startAngle={-90}
        />
        { /* Android机型上想要VictoryPie响应点击事件需要用一个Svg把它包起来，并设置standalone={false} */ }
        <Svg width={400} height={400} style={{ width: "100%", height: "auto" }}>
          <VictoryPie
            standalone={false}
            style={{
              labels: {
                fill: "white",
                stroke: "none",
                fontSize: 15,
                fontWeight: "bold"
              }
            }}
            data={[
              { x: "<5", y: 6279 },
              { x: "5-13", y: 9182 },
              { x: "14-17", y: 5511 },
              { x: "18-24", y: 7164 },
              { x: "25-44", y: 6716 },
              { x: "45-64", y: 4263 },
              { x: "≥65", y: 7502 }
            ]}
            innerRadius={70}
            labelRadius={100}
            colorScale={[
              "#D85F49",
              "#F66D3B",
              "#D92E1D",
              "#D73C4C",
              "#FFAF59",
              "#E28300",
              "#F6A57F"
            ]}
            events={[{
              target: "data",
              eventHandlers: {
                onPressIn: () => {
                  console.log("11111");
                  return [
                    {
                      target: "data",
                      mutation: ({ style }) => {
                        return style.fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };
                      }
                    }
                  ];
                }
              }
            }]}
          />
        </Svg>


        <VictoryPie
          style={{
            data: {
              stroke: (data) => (data.y > 75 ? "black" : "none"),
              opacity: (data) => (data.y > 75 ? 1 : 0.4)
            }
          }}
          data={[
            { x: "Cat", y: 62 },
            { x: "Dog", y: 91 },
            { x: "Fish", y: 55 },
            { x: "Bird", y: 55 }
          ]}
        />
      </ScrollView>
    );
  }
}
