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
import { CoffeeRecord } from "../../../types/CoffeeTypes";
import RadarChart from "../../../components/RadarChart/RadarChart";

type RouteParams = {
  id: string;
};

export default function CoffeeItemScreen() {
  const route = useRoute();
  const router = useRouter();
  const { id } = route.params as RouteParams;

  const [coffeeRecord, setCoffeeRecord] = useState<CoffeeRecord | null>(null);
  const [loading, setLoading] = useState(true);
  // 画像URIを環境に応じて適切に処理する関数 - Fixed return type
  const getImageSource = (uri?: string | null): ImageSourcePropType => {
    if (!uri) {
      return require("../../../assets/images/no-image.png");
    }

    if (Platform.OS === "web") {
      // Base64形式かどうかをチェック
      if (uri.startsWith("data:image")) {
        return { uri };
      }
      // web環境でfileプロトコルは使用できないため、デフォルトの画像を表示する。
      return require("../../../assets/images/no-image.png");
    } else {
      // モバイル環境の場合
      return { uri: uri.startsWith("file://") ? uri : `file://${uri}` };
    }
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
        setCoffeeRecord(record);
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
        <PageTitleComponent TextData={coffeeRecord.name} />
        <View style={[styles.absoluteBox, styles.mainContents]}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={true}
          >
            <View style={styles.imageContents}>
              <Image
                source={getImageSource(coffeeRecord.imageUri)}
                style={styles.recordImagePreview}
                defaultSource={require("../../../assets/images/no-image.png")} // Optional fallback
              />
            </View>

            <View style={styles.varietyContainer}>
              <Text style={[styles.text, styles.labelText, styles.variety]}>
                種類
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {coffeeRecord.variety}
              </Text>
            </View>
            <View style={styles.productionAreaContainer}>
              <Text
                style={[styles.text, styles.labelText, styles.productionArea]}
              >
                産地
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {coffeeRecord.productionArea}
              </Text>
            </View>
            <View style={styles.roastingDegreeContainer}>
              <Text
                style={[styles.text, styles.labelText, styles.roastingDegree]}
              >
                焙煎度
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {coffeeRecord.roastingDegree}
              </Text>
            </View>
            <View style={styles.extractionMethodContainer}>
              <Text
                style={[styles.text, styles.labelText, styles.extractionMethod]}
              >
                抽出器具
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {coffeeRecord.extractionMethod}
              </Text>
            </View>
            <View style={styles.extractionMakerContainer}>
              <Text
                style={[styles.text, styles.labelText, styles.extractionMaker]}
              >
                抽出メーカー
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {coffeeRecord.extractionMaker}
              </Text>
            </View>
            <View style={styles.grindSizeContainer}>
              <Text style={[styles.text, styles.labelText, styles.grindSize]}>
                挽き目
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {coffeeRecord.grindSize}
              </Text>
            </View>
            <View style={styles.temperatureContainer}>
              <Text style={[styles.text, styles.labelText, styles.temperature]}>
                注湯温度
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {coffeeRecord.temperature}
              </Text>
            </View>
            <View style={styles.coffeeAmountContainer}>
              <Text
                style={[styles.text, styles.labelText, styles.coffeeAmount]}
              >
                粉量
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {coffeeRecord.coffeeAmount}
              </Text>
            </View>
            <View style={styles.waterAmountContainer}>
              <Text style={[styles.text, styles.labelText, styles.waterAmount]}>
                水量
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {coffeeRecord.waterAmount}
              </Text>
            </View>
            <View style={styles.extractionTimeContainer}>
              <Text
                style={[styles.text, styles.labelText, styles.extractionTime]}
              >
                抽出時間
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {coffeeRecord.extractionTime}
              </Text>
            </View>
            <View style={styles.acidityContainer}>
              <Text style={[styles.text, styles.labelText, styles.acidity]}>
                酸味
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {coffeeRecord.acidity}
              </Text>
            </View>
            <View style={styles.sweetnessContainer}>
              <Text style={[styles.text, styles.labelText, styles.sweetness]}>
                甘味
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {coffeeRecord.sweetness}
              </Text>
            </View>
            <View style={styles.bitternessContainer}>
              <Text style={[styles.text, styles.labelText, styles.bitterness]}>
                苦味
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {coffeeRecord.bitterness}
              </Text>
            </View>
            <View style={styles.bodyContainer}>
              <Text style={[styles.text, styles.labelText, styles.body]}>
                コク
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {coffeeRecord.body}
              </Text>
            </View>
            <View style={styles.aromaContainer}>
              <Text style={[styles.text, styles.labelText, styles.aroma]}>
                香り
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {coffeeRecord.aroma}
              </Text>
            </View>
            <View style={styles.aftertasteContainer}>
              <Text style={[styles.text, styles.labelText, styles.aftertaste]}>
                後味
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {coffeeRecord.aftertaste}
              </Text>
            </View>
            <View style={styles.radarChartContainer}>
              <Text style={[styles.text, styles.labelText, styles.radarChart]}>
                radarChart
              </Text>
              <View style={styles.recordRadarChart}>
                <RadarChart
                  data={{
                    acidity: Number(coffeeRecord.acidity) || 0,
                    bitterness: Number(coffeeRecord.bitterness) || 0,
                    sweetness: Number(coffeeRecord.sweetness) || 0,
                    body: Number(coffeeRecord.body) || 0,
                    aroma: Number(coffeeRecord.aroma) || 0,
                    aftertaste: Number(coffeeRecord.aftertaste) || 0,
                  }}
                />
              </View>
            </View>
            <View style={styles.memoContainer}>
              <Text style={[styles.text, styles.labelText, styles.memo]}>
                MEMO
              </Text>
              <Text style={[styles.text, styles.valueText]}>
                {coffeeRecord.memo}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.updateButton}
              onPress={() =>
                router.push({ pathname: `../update/${coffeeRecord.id}` })
              }
            >
              <Text style={styles.updateButtonText}>編集</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteRecord(coffeeRecord.id)}
            >
              <Text style={styles.deleteButtonText}>削除</Text>
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
    backgroundColor: "#FF6347", // Tomato red
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
  },
  deleteButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: "#4682B4", // Steel blue
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    width: "80%",
    alignSelf: "center",
  },
  updateButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
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
