import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  Platform,
  Text,
  Alert,
} from "react-native";
import { Link, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router"; // useRouter をインポート
import HeaderComponent from "../../../components/HeaderComponent";
import PageTitleComponent from "../../../components/PageTitleComponent";
import CoffeeStorageService from "../../../services/CoffeeStorageService";
// import { CoffeeRecord } from "../../../types/CoffeeTypes";
import SelectComponent from "../../../components/SelectComponent";
import InputComponent from "../../../components/InputComponent";
import RangeComponent from "../../../components/RangeComponent";
import NumberComponent from "../../../components/NumberComponent";
import ImageUploadComponent from "../../../components/ImageUploadComponent";
import TextAreaComponent from "../../../components/TextAreaComponent";
import MeasuredTimeInputComponent from "../../../components/MeasuredTimeInputComponent ";
import RadarChart from "../../../components/RadarChart/RadarChart";

type RouteParams = {
  id: string;
};
interface CoffeeRecord {
  imageUri: string;
  id: string;
  name: string;
  variety: string;
  productionArea: string;
  roastingDegree:
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
export default function CoffeeItemScreen() {
  const route = useRoute();
  const router = useRouter();
  const { id } = route.params as RouteParams;
  const [InputLabel, setInputLabel] = useState({
    beansName: "名称",
    variety: "品種",
    productionArea: "産地",
  });
  const [SelectLabel, setSelectLabel] = useState({
    roastingDegree: "焙煎度",
    extractionMaker: "抽出メーカー",
    extractionMethod: "抽出方法",
    grindSize: "挽き目",
  });
  const [RangeLabel, setRangeLabel] = useState({
    acidity: "酸味",
    bitterness: "苦味",
    sweetness: "甘味",
    body: "コク",
    aroma: "香り",
    aftertaste: "後味",
  });
  const [NumberLabel, setNumberLabel] = useState({
    temperature: "温度（℃）",
    coffeeAmount: "紛量（g）",
    waterAmount: "湯量（g）",
  });
  const [coffeeRecord, setCoffeeRecord] = useState<CoffeeRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<CoffeeRecord>>({});
  const [rangeValues, setRangeValues] = useState<Partial<CoffeeRecord>>({});
  // 画像URIを環境に応じて適切に処理する関数 - Fixed return type

  const handleInputChange = (label: string, value: string | number) => {
    setFormData({ ...formData, [label]: value });
  };
  const handleImageChange = (value: string) => {
    setImageData(value);
    setFormData({ ...formData, imageUri: value }); // imageData の更新後に formData を更新
  };

  const handleSelectChange = (label: string, value: string) => {
    setFormData({ ...formData, [label]: value });
  };

  const handleRangeChange = (label: string, value: number) => {
    setFormData({ ...formData, [label]: value });
    setRangeValues({ ...rangeValues, [label]: value });
  };

  const handleTextAreaChange = (value: string) => {
    setFormData({ ...formData, memo: value });
  };

  const handleMeasuredTimeChange = (value: string) => {
    setFormData({ ...formData, extractionTime: value });
  };
  const handleDeleteRecord = async (id: string) => {
    if (Platform.OS === "web") {
      // Web環境の場合、window.confirm を使用
      if (window.confirm("このレコードを削除しますか？")) {
        try {
          await CoffeeStorageService.deleteCoffeeRecord(id);
          router.push("/list");
        } catch (error) {
          console.error("レコードの削除に失敗しました:", error);
        }
      }
    } else {
      // モバイル環境の場合、Alert.alert を使用
      Alert.alert(
        "削除確認",
        "このレコードを削除しますか？",
        [
          {
            text: "キャンセル",
            style: "cancel",
          },
          {
            text: "削除",
            style: "destructive",
            onPress: async () => {
              try {
                await CoffeeStorageService.deleteCoffeeRecord(id);
                router.push("/list");
              } catch (error) {
                console.error("レコードの削除に失敗しました:", error);
              }
            },
          },
        ],
        { cancelable: false }
      );
    }
  };
  useEffect(() => {
    const fetchCoffeeRecord = async () => {
      try {
        const record = await CoffeeStorageService.getCoffeeRecordById(id);
        if (record) {
          setFormData({
            imageUri: record?.imageUri,
            name: record?.name,
            variety: record?.variety,
            productionArea: record?.productionArea,
            roastingDegree: record.roastingDegree,
            extractionMethod: record?.extractionMethod,
            extractionMaker: record?.extractionMaker,
            grindSize: record?.grindSize,
            temperature: record?.temperature,
            coffeeAmount: record?.coffeeAmount,
            waterAmount: record?.waterAmount,
            extractionTime: record?.extractionTime,
            acidity: record?.acidity,
            bitterness: record?.bitterness,
            sweetness: record?.sweetness,
            body: record?.body,
            aroma: record?.aroma,
            aftertaste: record?.aftertaste,
            memo: record?.memo,
          });

          setRangeValues({
            acidity: record?.acidity,
            bitterness: record?.bitterness,
            sweetness: record?.sweetness,
            body: record?.body,
            aroma: record?.aroma,
            aftertaste: record?.aftertaste,
          });
          setCoffeeRecord(record);
        }
      } catch (error) {
        console.error("コーヒーレコードの取得に失敗しました:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffeeRecord();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!coffeeRecord) {
    return (
      <View style={styles.container}>
        <Text>コーヒーレコードが見つかりません</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contents}>
        <HeaderComponent />
        <PageTitleComponent TextData={"Coffee Update"} />
        <View style={[styles.absoluteBox, styles.mainContents]}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={true}
          >
            <InputComponent
              dataTitle={InputLabel.beansName}
              onChange={(value: string) =>
                handleInputChange("beansName", value)
              }
              value={coffeeRecord.name}
            />
            <ImageUploadComponent
              onChange={handleImageChange}
              value={coffeeRecord.imageUri}
            />
            <InputComponent
              dataTitle={InputLabel.variety}
              onChange={(value: string) => handleInputChange("variety", value)}
              value={coffeeRecord.variety}
            />
            <InputComponent
              dataTitle={InputLabel.productionArea}
              onChange={(value: string) =>
                handleInputChange("productionArea", value)
              }
              value={coffeeRecord.productionArea}
            />
            <SelectComponent
              dataTitle={SelectLabel.roastingDegree}
              onChange={(value: string) =>
                handleSelectChange("roastingDegree", value)
              }
              value={coffeeRecord.roastingDegree}
            />
            <SelectComponent
              dataTitle={SelectLabel.extractionMethod}
              onChange={(value: string) =>
                handleSelectChange("extractionMethod", value)
              }
              value={coffeeRecord.extractionMethod}
            />
            <SelectComponent
              dataTitle={SelectLabel.extractionMaker}
              onChange={(value: string) =>
                handleSelectChange("extractionMaker", value)
              }
              value={coffeeRecord.extractionMaker}
            />
            <SelectComponent
              dataTitle={SelectLabel.grindSize}
              onChange={(value: string) =>
                handleSelectChange("grindSize", value)
              }
              value={coffeeRecord.grindSize}
            />
            <NumberComponent
              dataTitle={NumberLabel.temperature}
              onChange={(value: number) =>
                handleInputChange("temperature", value)
              }
              value={coffeeRecord.temperature}
            />
            <NumberComponent
              dataTitle={NumberLabel.coffeeAmount}
              onChange={(value: number) =>
                handleInputChange("coffeeAmount", value)
              }
              value={coffeeRecord.coffeeAmount}
            />
            <NumberComponent
              dataTitle={NumberLabel.waterAmount}
              onChange={(value: number) =>
                handleInputChange("waterAmount", value)
              }
              value={coffeeRecord.waterAmount}
            />
            <MeasuredTimeInputComponent
              onChange={handleMeasuredTimeChange}
              value={coffeeRecord.extractionTime}
            />
            <RangeComponent
              dataTitle={RangeLabel.acidity}
              onChange={(value: number) => handleRangeChange("acidity", value)}
              value={rangeValues.acidity}
            />
            <RangeComponent
              dataTitle={RangeLabel.bitterness}
              onChange={(value: number) =>
                handleRangeChange("bitterness", value)
              }
              value={rangeValues.bitterness}
            />
            <RangeComponent
              dataTitle={RangeLabel.sweetness}
              onChange={(value: number) =>
                handleRangeChange("sweetness", value)
              }
              value={rangeValues.sweetness}
            />
            <RangeComponent
              dataTitle={RangeLabel.body}
              onChange={(value: number) => handleRangeChange("body", value)}
              value={rangeValues.body}
            />
            <RangeComponent
              dataTitle={RangeLabel.aroma}
              onChange={(value: number) => handleRangeChange("aroma", value)}
              value={rangeValues.aroma}
            />
            <RangeComponent
              dataTitle={RangeLabel.aftertaste}
              onChange={(value: number) =>
                handleRangeChange("aftertaste", value)
              }
              value={rangeValues.aftertaste}
            />
            <RadarChart data={rangeValues} />
            <TextAreaComponent
              onChange={handleTextAreaChange}
              value={coffeeRecord.memo}
            />
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
    justifyContent: "center",
    alignItems: "center",
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
    bottom: 0,
  },
  scrollContainer: {
    alignItems: "center",
    paddingVertical: 20,
    paddingBottom: 40,
  },
  imageContents: {
    width: "90%",
    marginBottom: 10,
    alignSelf: "center", // Center the contents
  },
  recordImagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginHorizontal: "auto",
    backgroundColor: "#F0F0F0", // デフォルト画像がない場合の背景色
  },
  text: {
    color: "#000",
    fontSize: 18,
  },
  nameContainer: {
    // name スタイル
  },
  varietyContainer: {},
  productionAreaContainer: {},
  roastingDegreeContainer: {},
  extractionMethodContainer: {},
  extractionMakerContainer: {},
  grindSizeContainer: {},
  temperatureContainer: {},
  coffeeAmountContainer: {},
  waterAmountContainer: {},
  extractionTimeContainer: {},
  acidityContainer: {},
  sweetnessContainer: {},
  bitternessContainer: {},
  bodyContainer: {},
  aromaContainer: {},
  aftertasteContainer: {},
  radarChartContainer: {},
  recordRadarChart: {},
  memoContainer: {},
  labelText: {
    color: "#D2B48C",
    paddingVertical: 10,
    textAlign: "center",
  },
  valueText: { textAlign: "center" },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  deleteButtonText: {
    color: "white",
    textAlign: "center",
  },
  updateButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  updateButtonText: {
    color: "white",
    textAlign: "center",
  },
  name: {
    // name スタイル
  },
  variety: {},
  productionArea: {},
  roastingDegree: {},
  extractionMethod: {},
  extractionMaker: {},
  grindSize: {},
  temperature: {},
  coffeeAmount: {},
  waterAmount: {},
  extractionTime: {},
  acidity: {},
  sweetness: {},
  bitterness: {},
  body: {},
  aroma: {},
  aftertaste: {},
  radarChart: {},
  memo: {},
});
