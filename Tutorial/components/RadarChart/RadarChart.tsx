import React from "react";
import { View, StyleSheet } from "react-native";
import {
  VictoryPolarAxis,
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryArea,
} from "victory-native";
interface RadarChartProps {
  data: {
    acidity: number;
    bitterness: number;
    sweetness: number;
    body: number;
    aroma: number;
    aftertaste: number;
  };
}

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  const chartData = [
    { x: "酸味", y: data.acidity },
    { x: "苦味", y: data.bitterness },
    { x: "甘味", y: data.sweetness },
    { x: "コク", y: data.body },
    { x: "香り", y: data.aroma },
    { x: "後味", y: data.aftertaste },
    { x: "酸味", y: data.acidity },
  ];

  return (
    <View style={styles.radarChartContainer}>
      <VictoryChart
        polar
        domain={{ y: [0, 5] }}
        theme={VictoryTheme.material}
        width={300} // width を undefined に設定
        height={300} // height を undefined に設定
      >
        <VictoryPolarAxis
          dependentAxis
          style={{ axis: { stroke: "none" } }}
          tickFormat={chartData}
        />
        <VictoryPolarAxis />
        <VictoryLine data={chartData} />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  radarChartContainer: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default RadarChart;
