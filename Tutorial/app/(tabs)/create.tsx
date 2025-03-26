import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Alert,
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
import CoffeeStorageService from "@/services/CoffeeStorageService"; // ストレージサービスをインポート

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
    measuredTime: "",
    acidity: 0,
    bitter: 0,
    sweet: 0,
    rich: 0,
    aroma: 0,
    aftertaste: 0,
    textArea: "",
  });

  const [rangeValues, setRangeValues] = useState({
    acidity: 0,
    bitter: 0,
    sweet: 0,
    rich: 0,
    aroma: 0,
    aftertaste: 0,
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
  // 新しい送信ハンドラー
  const handleSubmit = async () => {
    // 必須フィールドのバリデーション
    const requiredFields = [
      "beansName",
      "variety",
      "productionArea",
      "roastingDegree",
      "extractionMethod",
    ];

    // const missingFields = requiredFields.filter((field) => !formData[field]);
    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );
    if (missingFields.length > 0) {
      Alert.alert(
        "入力エラー",
        `以下の必須項目が未入力です：\n${missingFields.join(", ")}`
      );
      return;
    }

    try {
      // データ変換（CoffeeRecordの型に合わせる）
      const coffeeRecord = {
        name: formData.beansName,
        variety: formData.variety,
        origin: formData.productionArea,
        roastLevel: formData.roastingDegree as
          | "Light"
          | "Medium"
          | "Dark"
          | "Espresso",
        extractionMethod: formData.extractionMethod as
          | "Drip"
          | "Espresso"
          | "French Press"
          | "Pour Over"
          | "Cold Brew",
        extractionEquipment: formData.extractionMaker,
        grindSize: formData.Grind as
          | "Extra Fine"
          | "Fine"
          | "Medium"
          | "Coarse"
          | "Extra Coarse",
        temperature: formData.temperature,
        coffeeAmount: formData.dose,
        waterAmount: formData.water,
        extractionTime: parseFloat(formData.measuredTime) || 0,
        acidity: formData.acidity,
        bitterness: formData.bitter,
        sweetness: formData.sweet,
        body: formData.rich,
        aroma: formData.aroma,
        aftertaste: formData.aftertaste,
        memo: formData.textArea,
      };

      // 画像データがある場合は渡す
      const recordId = await CoffeeStorageService.saveCoffeeRecord(
        coffeeRecord,
        formData.imageData || undefined
      );

      // 保存成功のアラート
      Alert.alert(
        "保存成功",
        `コーヒーレコードが保存されました。ID: ${recordId}`,
        [
          {
            text: "OK",
            onPress: () => {
              // 必要に応じてナビゲーションや画面のリセット
              // navigation.goBack() など
            },
          },
        ]
      );

      // フォームをリセット
      resetForm();
    } catch (error) {
      // エラーハンドリング
      Alert.alert(
        "保存エラー",
        "コーヒーレコードの保存中にエラーが発生しました。"
      );
      console.error("保存エラー:", error);
    }
  };

  // フォームリセット関数
  const resetForm = () => {
    setFormData({
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
      measuredTime: "",
      acidity: 0,
      bitter: 0,
      sweet: 0,
      rich: 0,
      aroma: 0,
      aftertaste: 0,
      textArea: "",
    });

    setRangeValues({
      acidity: 0,
      bitter: 0,
      sweet: 0,
      rich: 0,
      aroma: 0,
      aftertaste: 0,
    });
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
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>保存</Text>
            </TouchableOpacity>
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
  submitButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
