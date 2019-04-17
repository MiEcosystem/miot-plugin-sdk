import { Surface } from "gl-react-native";
import React, { Component } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import seedrandom from "seedrandom";
import Heart from "./../Hearts/Heart";

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flexDirection: "row",
    flexWrap: "wrap",
  }
});

const samples = [1, 2, 3, 4, 5, 6, 7, 8];

export default class Orientation extends Component {
  render() {
    const seed = "gl-react is awesome";
    const random = seedrandom(seed);
    const color = [random(), random(), random()];
    return (
      <ScrollView>
        <View style={styles.container}>
          {samples.map(i =>
            <Surface key={`landscape_1`} width={120} height={90}>
              <Heart color={color} />
              {/* <Blur factor={0.2} passes={2}>
        {`https://raw.githubusercontent.com/recurser/exif-orientation-examples/master/Landscape_1.jpg`}
      </Blur> */}
            </Surface>)
          }
        </View>
        <View style={styles.container}>
          {samples.map(i =>
            <Surface key={`portrait_${i}`} width={120} height={160}>
              <Heart color={color} />
              {/* <Blur factor={0.2} passes={2}>
         {`https://raw.githubusercontent.com/recurser/exif-orientation-examples/master/Portrait_${i}.jpg`}
       </Blur> */}
            </Surface>)}
        </View>
      </ScrollView>
    );
  }
}
