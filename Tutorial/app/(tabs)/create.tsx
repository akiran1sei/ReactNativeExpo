import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
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
    extractionMaker: "抽出メーカー",
    extractionMethod: "抽出方法",
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
  const [imageData, setImageData] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    imageData: "",
    beansName: "",
    variety: "",
    productionArea: "",
    roastingDegree: "",
    extractionMethod: "",
    extractionMaker: "",
    Grind: "",
    temperature: 0,
    dose: 0,
    water: 0,
    measuredTime: "", // MeasuredTimeInputComponent の値
    acidity: 0,
    bitter: 0,
    sweet: 0,
    rich: 0,
    aroma: 0,
    aftertaste: 0,
    textArea: "", // TextAreaComponent の値
  });

  const handleInputChange = (label: string, value: string | number) => {
    setFormData({ ...formData, [label]: value });
  };

  const handleSelectChange = (label: string, value: string) => {
    setFormData({ ...formData, [label]: value });
  };

  const handleRangeChange = (label: string, value: number) => {
    setFormData({ ...formData, [label]: value });
    setRangeValues({ ...rangeValues, [label]: value });
  };

  const handleTextAreaChange = (value: string) => {
    setFormData({ ...formData, textArea: value });
  };

  const handleMeasuredTimeChange = (value: string) => {
    setFormData({ ...formData, measuredTime: value });
  };
  const handleImageChange = (value: string) => {
    setImageData(value);
    setFormData({ ...formData, imageData: value }); // imageData の更新後に formData を更新
  };
  console.log("formData", formData);
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
            {/* {imageData && (
              <Image source={{ uri: imageData }} style={styles.preview} />
            )} */}
            <ImageUploadComponent onChange={handleImageChange} />
            <InputComponent
              dataTitle={InputLabel.beansName}
              onChange={(value: string) =>
                handleInputChange("beansName", value)
              }
            />
            <InputComponent
              dataTitle={InputLabel.variety}
              onChange={(value: string) => handleInputChange("variety", value)}
            />
            <InputComponent
              dataTitle={InputLabel.productionArea}
              onChange={(value: string) =>
                handleInputChange("productionArea", value)
              }
            />
            <SelectComponent
              dataTitle={SelectLabel.roastingDegree}
              onChange={(value: string) =>
                handleSelectChange("roastingDegree", value)
              }
            />
            <SelectComponent
              dataTitle={SelectLabel.extractionMethod}
              onChange={(value: string) =>
                handleSelectChange("extractionMethod", value)
              }
            />
            <SelectComponent
              dataTitle={SelectLabel.extractionMaker}
              onChange={(value: string) =>
                handleSelectChange("extractionMaker", value)
              }
            />
            <SelectComponent
              dataTitle={SelectLabel.Grind}
              onChange={(value: string) => handleSelectChange("Grind", value)}
            />
            <NumberComponent
              dataTitle={NumberLabel.temperature}
              onChange={(value: number) =>
                handleInputChange("temperature", value)
              }
            />
            <NumberComponent
              dataTitle={NumberLabel.dose}
              onChange={(value: number) => handleInputChange("dose", value)}
            />
            <NumberComponent
              dataTitle={NumberLabel.water}
              onChange={(value: number) => handleInputChange("water", value)}
            />
            <MeasuredTimeInputComponent onChange={handleMeasuredTimeChange} />
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
            <TextAreaComponent onChange={handleTextAreaChange} />
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
  preview: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});
