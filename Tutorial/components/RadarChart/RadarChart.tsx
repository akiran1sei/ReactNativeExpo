import React from "react";
import { View, StyleSheet } from "react-native";
import {
  VictoryPolarAxis,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
} from "victory-native";
const data = [
  { x: "酸味", y: 1 },
  { x: "苦味", y: 0.5 },
  { x: "甘味", y: 1 },
  { x: "コク", y: 1.5 },
  { x: "香り", y: 2.5 },
  { x: "後味", y: 3.5 },
  { x: "酸味", y: 1 }, // 閉じるための最初のデータを再度追加
];

const RadarChart = () => {
  return (
    <View style={styles.container}>
      <VictoryChart polar domain={{ y: [0, 5] }} theme={VictoryTheme.clean}>
        <VictoryPolarAxis
          dependentAxis
          style={{ axis: { stroke: "none" } }}
          tickFormat={data}
        />
        <VictoryPolarAxis />
        <VictoryLine data={data} />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RadarChart;
