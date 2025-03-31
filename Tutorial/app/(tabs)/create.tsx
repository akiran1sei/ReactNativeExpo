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
import HeaderComponent from "../../components/HeaderComponent";
import PageTitleComponent from "../../components/PageTitleComponent";
import SelectComponent from "../../components/SelectComponent";
import InputComponent from "../../components/InputComponent";
import RangeComponent from "../../components/RangeComponent";
import NumberComponent from "../../components/NumberComponent";
import ImageUploadComponent from "../../components/ImageUploadComponent";
import TextAreaComponent from "../../components/TextAreaComponent";
import MeasuredTimeInputComponent from "../../components/MeasuredTimeInputComponent ";
import RadarChart from "../../components/RadarChart/RadarChart";
import CoffeeStorageService from "../../services/CoffeeStorageService"; // ストレージサービスをインポート

interface CoffeeRecord {
  id: string;
  name: string;
  variety: string;
  origin: string;
  roastLevel:
    | "lightroast"
    | "cinnamonroast"
    | "mediumroast"
    | "highroast"
    | "cityroast"
    | "fullcityroast"
    | "frenchroast"
    | "italianroast";
  extractionMethod:
    | "paperdrip"
    | "neldrip"
    | "metalfilterdrip"
    | "frenchpress"
    | "aeropress"
    | "coffeemakerdrip"
    | "syphon"
    | "espresso"
    | "mokapotextraction"
    | "icedrip";
  extractionMaker: string;
  grindSize:
    | "extrafine"
    | "fine"
    | "mediumfine"
    | "medium"
    | "coarse"
    | "extracourse";
  temperature: number;
  coffeeAmount: number;
  waterAmount: number;
  extractionTime: number;
  acidity: number;
  bitterness: number;
  sweetness: number;
  body: number;
  aroma: number;
  aftertaste: number;
  memo: string;
}

export default function CreateScreen() {
  const TextData = "Coffee Create"; // ページタイトルに表示するテキスト
  const [resetKey, setResetKey] = useState(0); // 追加
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
    // 型安全な方法で必須フィールドをチェック
    const missingFields = (
      Object.keys(formData) as Array<keyof typeof formData>
    ).filter((field) => {
      const value = formData[field];
      return (
        value === null ||
        value === undefined ||
        value === "" ||
        (typeof value === "number" && value === 0)
      );
    });

    if (missingFields.length > 0) {
      Alert.alert(
        "入力エラー",
        `以下の必須項目が未入力です：\n${missingFields.join(", ")}`
      );
      return;
    }

    try {
      // バリデーション関数の修正
      function validateRoastLevel(
        level: string
      ):
        | "lightroast"
        | "cinnamonroast"
        | "mediumroast"
        | "highroast"
        | "cityroast"
        | "fullcityroast"
        | "frenchroast"
        | "italianroast" {
        const validLevels = [
          "lightroast",
          "cinnamonroast",
          "mediumroast",
          "highroast",
          "cityroast",
          "fullcityroast",
          "frenchroast",
          "italianroast",
        ];
        if (!validLevels.includes(level)) {
          throw new Error(`Invalid roast level: ${level}`);
        }
        return level as
          | "lightroast"
          | "cinnamonroast"
          | "mediumroast"
          | "highroast"
          | "cityroast"
          | "fullcityroast"
          | "frenchroast"
          | "italianroast";
      }

      function validateExtractionMethod(
        method: string
      ):
        | "paperdrip"
        | "neldrip"
        | "metalfilterdrip"
        | "frenchpress"
        | "aeropress"
        | "coffeemakerdrip"
        | "syphon"
        | "espresso"
        | "mokapotextraction"
        | "icedrip" {
        const validMethods = [
          "paperdrip",
          "neldrip",
          "metalfilterdrip",
          "frenchpress",
          "aeropress",
          "coffeemakerdrip",
          "syphon",
          "espresso",
          "mokapotextraction",
          "icedrip",
        ];
        if (!validMethods.includes(method)) {
          throw new Error(`Invalid extraction method: ${method}`);
        }
        return method as
          | "paperdrip"
          | "neldrip"
          | "metalfilterdrip"
          | "frenchpress"
          | "aeropress"
          | "coffeemakerdrip"
          | "syphon"
          | "espresso"
          | "mokapotextraction"
          | "icedrip";
      }

      function validateGrindSize(
        size: string
      ):
        | "extrafine"
        | "fine"
        | "mediumfine"
        | "medium"
        | "coarse"
        | "extracourse" {
        const validSizes = [
          "extrafine",
          "fine",
          "mediumfine",
          "medium",
          "coarse",
          "extracourse",
        ];
        if (!validSizes.includes(size)) {
          throw new Error(`Invalid grind size: ${size}`);
        }
        return size as
          | "extrafine"
          | "fine"
          | "mediumfine"
          | "medium"
          | "coarse"
          | "extracourse";
      }
      // フォームリセット関数
      const resetForm = () => {
        setImageData(null);
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
        setResetKey((prevKey) => prevKey + 1); // 追加
      };
      // 型安全な変換
      const coffeeRecord: Omit<CoffeeRecord, "id"> = {
        name: formData.beansName,
        variety: formData.variety,
        origin: formData.productionArea,
        roastLevel: validateRoastLevel(formData.roastingDegree),
        extractionMethod: validateExtractionMethod(formData.extractionMethod),
        extractionMaker: formData.extractionMaker,
        grindSize: validateGrindSize(formData.Grind),
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

      const recordId = await CoffeeStorageService.saveCoffeeRecord(
        coffeeRecord,
        formData.imageData || undefined
      );

      Alert.alert(
        "保存成功",
        `コーヒーレコードが保存されました。ID: ${recordId}`,
        [
          {
            text: "OK",
            onPress: () => {
              // ナビゲーションや画面のリセット処理
              resetForm();
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "保存エラー",
        error instanceof Error
          ? error.message
          : "コーヒーレコードの保存中にエラーが発生しました。"
      );
      console.error("保存エラー:", error);
    }
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
            <ImageUploadComponent
              key={`imageUpload-${resetKey}`} // 追加
              onChange={handleImageChange}
              value={imageData}
            />
            <InputComponent
              key={`beansName-${resetKey}`} // 追加
              dataTitle={InputLabel.beansName}
              onChange={(value: string) =>
                handleInputChange("beansName", value)
              }
              value={formData.beansName}
            />
            <InputComponent
              key={`variety-${resetKey}`} // 追加
              dataTitle={InputLabel.variety}
              onChange={(value: string) => handleInputChange("variety", value)}
              value={formData.variety}
            />
            <InputComponent
              key={`productionArea-${resetKey}`} // 追加
              dataTitle={InputLabel.productionArea}
              onChange={(value: string) =>
                handleInputChange("productionArea", value)
              }
              value={formData.productionArea}
            />
            <SelectComponent
              key={`roastingDegree-${resetKey}`} // 追加
              dataTitle={SelectLabel.roastingDegree}
              onChange={(value: string) =>
                handleSelectChange("roastingDegree", value)
              }
              value={formData.roastingDegree}
            />
            <SelectComponent
              key={`extractionMethod-${resetKey}`} // 追加
              dataTitle={SelectLabel.extractionMethod}
              onChange={(value: string) =>
                handleSelectChange("extractionMethod", value)
              }
              value={formData.extractionMethod}
            />
            <SelectComponent
              key={`extractionMaker-${resetKey}`} // 追加
              dataTitle={SelectLabel.extractionMaker}
              onChange={(value: string) =>
                handleSelectChange("extractionMaker", value)
              }
              value={formData.extractionMaker}
            />
            <SelectComponent
              key={`Grind-${resetKey}`} // 追加
              dataTitle={SelectLabel.Grind}
              onChange={(value: string) => handleSelectChange("Grind", value)}
              value={formData.Grind}
            />
            <NumberComponent
              key={`temperature-${resetKey}`} // 追加
              dataTitle={NumberLabel.temperature}
              onChange={(value: number) =>
                handleInputChange("temperature", value)
              }
              value={formData.temperature}
            />
            <NumberComponent
              key={`dose-${resetKey}`} // 追加
              dataTitle={NumberLabel.dose}
              onChange={(value: number) => handleInputChange("dose", value)}
              value={formData.dose}
            />
            <NumberComponent
              key={`water-${resetKey}`} // 追加
              dataTitle={NumberLabel.water}
              onChange={(value: number) => handleInputChange("water", value)}
              value={formData.water}
            />
            <MeasuredTimeInputComponent
              key={`measuredTime-${resetKey}`} // 追加
              onChange={handleMeasuredTimeChange}
              value={formData.measuredTime}
            />
            <RangeComponent
              key={`acidity-${resetKey}`} // 追加
              dataTitle={RangeLabel.acidity}
              onChange={(value: number) => handleRangeChange("acidity", value)}
              value={rangeValues.acidity}
            />
            <RangeComponent
              key={`bitter-${resetKey}`} // 追加
              dataTitle={RangeLabel.bitter}
              onChange={(value: number) => handleRangeChange("bitter", value)}
              value={rangeValues.bitter}
            />
            <RangeComponent
              key={`sweet-${resetKey}`} // 追加
              dataTitle={RangeLabel.sweet}
              onChange={(value: number) => handleRangeChange("sweet", value)}
              value={rangeValues.sweet}
            />
            <RangeComponent
              key={`rich-${resetKey}`} // 追加
              dataTitle={RangeLabel.rich}
              onChange={(value: number) => handleRangeChange("rich", value)}
              value={rangeValues.rich}
            />
            <RangeComponent
              key={`aroma-${resetKey}`} // 追加
              dataTitle={RangeLabel.aroma}
              onChange={(value: number) => handleRangeChange("aroma", value)}
              value={rangeValues.aroma}
            />
            <RangeComponent
              key={`aftertaste-${resetKey}`} // 追加
              dataTitle={RangeLabel.aftertaste}
              onChange={(value: number) =>
                handleRangeChange("aftertaste", value)
              }
              value={rangeValues.aftertaste}
            />
            <RadarChart data={rangeValues} />
            <TextAreaComponent
              key={`textArea-${resetKey}`} // 追加
              onChange={handleTextAreaChange}
              value={formData.textArea}
            />
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
    width: "100%",
    maxWidth: 500,
    marginHorizontal: "auto",
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
