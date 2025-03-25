import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import HeaderComponent from "@/components/HeaderComponent";
import PageTitleComponent from "@/components/PageTitleComponent";
import SelectComponent from "@/components/SelectComponent";
import InputComponent from "@/components/InputComponent";
import RangeComponent from "@/components/RangeComponent";
import NumberComponent from "@/components/NumberComponent";
import ImageUploadComponent from "@/components/ImageUploadComponent";
import TextAreaComponent from "@/components/TextAreaComponent";
import MeasuredTimeInputComponent from "@/components/MeasuredTimeInputComponent ";
import RadarChart from "@/components/RadarChart/RadarChart";

export default function CreateScreen() {
  const TextData = "Coffee Create"; // ページタイトルに表示するテキスト
  const [InputLabel, setInputLabel] = useState({
    beansName: "名称",
    variety: "品種",
    productionArea: "産地",
  });
  const [SelectLabel, setSelectLabel] = useState({
    roastingDegree: "焙煎度",
    extractionMethod: "抽出方法",
    extractionEquipment: "抽出器具",
    Grind: "挽き目",
  });
  const [RangeLabel, setRangeLabel] = useState({
    acidity: "酸味",
    bitter: "苦味",
    sweet: "甘味",
    rich: "コク",
    aroma: "香り",
    aftertaste: "後味",
  });
  const [NumberLabel, setNumberLabel] = useState({
    temperature: "温度（℃）",
    dose: "紛量（g）",
    water: "湯量（g）",
  });
  const [rangeValues, setRangeValues] = useState({
    acidity: 0,
    bitter: 0,
    sweet: 0,
    rich: 0,
    aroma: 0,
    aftertaste: 0,
  });
  const handleRangeChange = (label: string, value: number) => {
    setRangeValues({ ...rangeValues, [label]: value });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contents}>
        {/* ヘッダーコンポーネントを配置 */}
        <HeaderComponent />
        <PageTitleComponent TextData={TextData} />

        <View style={[styles.absoluteBox, styles.mainContents]}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={true}
          >
            <ImageUploadComponent />
            <InputComponent dataTitle={InputLabel.beansName} />
            <InputComponent dataTitle={InputLabel.variety} />
            <InputComponent dataTitle={InputLabel.productionArea} />
            <SelectComponent dataTitle={SelectLabel.roastingDegree} />
            <SelectComponent dataTitle={SelectLabel.extractionMethod} />
            <SelectComponent dataTitle={SelectLabel.extractionEquipment} />
            <SelectComponent dataTitle={SelectLabel.Grind} />

            <NumberComponent dataTitle={NumberLabel.temperature} />
            <NumberComponent dataTitle={NumberLabel.dose} />
            <NumberComponent dataTitle={NumberLabel.water} />
            <MeasuredTimeInputComponent />
            <RangeComponent
              dataTitle={RangeLabel.acidity}
              onChange={(value: number) => handleRangeChange("acidity", value)}
            />
            <RangeComponent
              dataTitle={RangeLabel.bitter}
              onChange={(value: number) => handleRangeChange("bitter", value)}
            />
            <RangeComponent
              dataTitle={RangeLabel.sweet}
              onChange={(value: number) => handleRangeChange("sweet", value)}
            />
            <RangeComponent
              dataTitle={RangeLabel.rich}
              onChange={(value: number) => handleRangeChange("rich", value)}
            />
            <RangeComponent
              dataTitle={RangeLabel.aroma}
              onChange={(value: number) => handleRangeChange("aroma", value)}
            />
            <RangeComponent
              dataTitle={RangeLabel.aftertaste}
              onChange={(value: number) =>
                handleRangeChange("aftertaste", value)
              }
            />
            <RadarChart data={rangeValues} />
            <TextAreaComponent />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  contents: {
    flex: 1,
    justifyContent: "center", // 縦方向の中心に配置
    alignItems: "center", // 横方向の中心に配置
  },
  absoluteBox: {
    flex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
  },
  mainContents: {
    top: 210,
    bottom: 0, // 画面の下部まで拡張
  },
  scrollContainer: {
    alignItems: "center", // 子要素を中央揃え
    paddingVertical: 20,
    paddingBottom: 40, // スクロール時の下部余白を追加
  },
  text: {
    color: "#000",
    fontSize: 18,
  },
});
