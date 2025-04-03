import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Platform,
  ImageSourcePropType,
  RefreshControl,
  TouchableOpacity, // TouchableOpacity をインポート
  Alert, // Alert をインポート
} from "react-native";
import { useRouter } from "expo-router";
import HeaderComponent from "../../components/HeaderComponent";
import PageTitleComponent from "../../components/PageTitleComponent";
import CoffeeStorageService from "../../services/CoffeeStorageService";
import { CoffeeRecord } from "../../types/CoffeeTypes";
import RadarChart from "../../components/RadarChart/RadarChart";

export default function ListScreen() {
  const router = useRouter();
  const [coffeeRecords, setCoffeeRecords] = useState<CoffeeRecord[]>([]);

  const [selectedRecord, setSelectedRecord] = useState<CoffeeRecord | null>(
    null
  );

  // Define default range values
  const defaultRangeValues = {
    acidity: 5,
    bitter: 5,
    sweet: 5,
    rich: 5,
    aroma: 5,
    aftertaste: 5,
  };

  const [rangeValues, setRangeValues] = useState(defaultRangeValues);
  const [refreshing, setRefreshing] = useState(false); // リフレッシュ状態を管理

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const records = await CoffeeStorageService.getAllCoffeeRecords();
      setCoffeeRecords(records);

      // Select the first record if available
      if (records.length > 0) {
        setSelectedRecord(records[0]);
        updateRangeValues(records[0]);
      }
    } catch (error) {
      console.error("データの取得に失敗しました:", error);
    }
  };
  const handleRefresh = async () => {
    setRefreshing(true); // リフレッシュ開始
    await fetchData(); // データ再取得
    setRefreshing(false); // リフレッシュ終了
  };
  // Update range values based on a coffee record
  const updateRangeValues = (record: CoffeeRecord) => {
    setRangeValues({
      acidity: Number(record.acidity) || 0,
      bitter: Number(record.bitterness) || 0,
      sweet: Number(record.sweetness) || 0,
      rich: Number(record.body) || 0,
      aroma: Number(record.aroma) || 0,
      aftertaste: Number(record.aftertaste) || 0,
    });
  };
  // 画像URIを環境に応じて適切に処理する関数 - Fixed return type
  const getImageSource = (uri?: string | null): ImageSourcePropType => {
    if (!uri) {
      return require("../../assets/images/no-image.png");
    }

    if (Platform.OS === "web") {
      // Base64形式かどうかをチェック
      if (uri.startsWith("data:image")) {
        return { uri };
      }
      // web環境でfileプロトコルは使用できないため、デフォルトの画像を表示する。
      return require("../../assets/images/no-image.png");
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
          await fetchData();
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
                await fetchData();
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

  const TextData = "Coffee List"; // ページタイトルに表示するテキスト

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        {/* ヘッダーコンポーネントを配置 */}
        <HeaderComponent />
        <PageTitleComponent TextData={TextData} />
        <View style={[styles.absoluteBox, styles.mainContents]}>
          <ScrollView
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
          >
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.innerScrollContainer}
            >
              <View style={styles.recordContainer}>
                {coffeeRecords.map((record) => (
                  <TouchableOpacity
                    key={record.id}
                    onPress={() =>
                      router.push({ pathname: `./item/${record.id}` })
                    }
                  >
                    <View style={styles.recordItem}>
                      <View style={styles.nameContainer}>
                        <Text
                          style={[styles.text, styles.labelText, styles.name]}
                        >
                          コーヒー豆
                        </Text>
                        <Text style={[styles.text, styles.valueText]}>
                          {record.name}
                        </Text>
                      </View>
                      <View style={styles.imageUriContainer}>
                        <Text
                          style={[
                            styles.text,
                            styles.labelText,
                            styles.imageUri,
                          ]}
                        >
                          画像
                        </Text>
                        {/* 画像表示部分 */}
                        <Image
                          source={getImageSource(record.imageUri)}
                          style={styles.recordImagePreview}
                          defaultSource={require("../../assets/images/no-image.png")} // Optional fallback
                        />
                      </View>
                      <View style={styles.varietyContainer}>
                        <Text
                          style={[
                            styles.text,
                            styles.labelText,
                            styles.variety,
                          ]}
                        >
                          種類
                        </Text>
                        <Text style={[styles.text, styles.valueText]}>
                          {record.variety}
                        </Text>
                      </View>
                      <View style={styles.productionAreaContainer}>
                        <Text
                          style={[
                            styles.text,
                            styles.labelText,
                            styles.productionArea,
                          ]}
                        >
                          産地
                        </Text>
                        <Text style={[styles.text, styles.valueText]}>
                          {record.productionArea}
                        </Text>
                      </View>
                      <View style={styles.roastingDegreeContainer}>
                        <Text
                          style={[
                            styles.text,
                            styles.labelText,
                            styles.roastingDegree,
                          ]}
                        >
                          焙煎度
                        </Text>
                        <Text style={[styles.text, styles.valueText]}>
                          {record.roastingDegree}
                        </Text>
                      </View>
                      <View style={styles.extractionMethodContainer}>
                        <Text
                          style={[
                            styles.text,
                            styles.labelText,
                            styles.extractionMethod,
                          ]}
                        >
                          抽出器具
                        </Text>
                        <Text style={[styles.text, styles.valueText]}>
                          {record.extractionMethod}
                        </Text>
                      </View>
                      <View style={styles.extractionMakerContainer}>
                        <Text
                          style={[
                            styles.text,
                            styles.labelText,
                            styles.extractionMaker,
                          ]}
                        >
                          抽出メーカー
                        </Text>
                        <Text style={[styles.text, styles.valueText]}>
                          {record.extractionMaker}
                        </Text>
                      </View>
                      <View style={styles.grindSizeContainer}>
                        <Text
                          style={[
                            styles.text,
                            styles.labelText,
                            styles.grindSize,
                          ]}
                        >
                          挽き目
                        </Text>
                        <Text style={[styles.text, styles.valueText]}>
                          {record.grindSize}
                        </Text>
                      </View>
                      <View style={styles.temperatureContainer}>
                        <Text
                          style={[
                            styles.text,
                            styles.labelText,
                            styles.temperature,
                          ]}
                        >
                          注湯温度
                        </Text>
                        <Text style={[styles.text, styles.valueText]}>
                          {record.temperature}
                        </Text>
                      </View>
                      <View style={styles.coffeeAmountContainer}>
                        <Text
                          style={[
                            styles.text,
                            styles.labelText,
                            styles.coffeeAmount,
                          ]}
                        >
                          粉量
                        </Text>
                        <Text style={[styles.text, styles.valueText]}>
                          {record.coffeeAmount}
                        </Text>
                      </View>
                      <View style={styles.waterAmountContainer}>
                        <Text
                          style={[
                            styles.text,
                            styles.labelText,
                            styles.waterAmount,
                          ]}
                        >
                          水量
                        </Text>
                        <Text style={[styles.text, styles.valueText]}>
                          {record.waterAmount}
                        </Text>
                      </View>
                      <View style={styles.extractionTimeContainer}>
                        <Text
                          style={[
                            styles.text,
                            styles.labelText,
                            styles.extractionTime,
                          ]}
                        >
                          抽出時間
                        </Text>
                        <Text style={[styles.text, styles.valueText]}>
                          {record.extractionTime}
                        </Text>
                      </View>

                      <View style={styles.acidityContainer}>
                        <Text
                          style={[
                            styles.text,
                            styles.labelText,
                            styles.acidity,
                          ]}
                        >
                          酸味
                        </Text>
                        <Text style={[styles.text, styles.valueText]}>
                          {record.acidity}
                        </Text>
                      </View>
                      <View style={styles.sweetnessContainer}>
                        <Text
                          style={[
                            styles.text,
                            styles.labelText,
                            styles.sweetness,
                          ]}
                        >
                          甘味
                        </Text>
                        <Text style={[styles.text, styles.valueText]}>
                          {record.sweetness}
                        </Text>
                      </View>
                      <View style={styles.bitternessContainer}>
                        <Text
                          style={[
                            styles.text,
                            styles.labelText,
                            styles.bitterness,
                          ]}
                        >
                          苦味
                        </Text>
                        <Text style={[styles.text, styles.valueText]}>
                          {record.bitterness}
                        </Text>
                      </View>
                      <View style={styles.bodyContainer}>
                        <Text
                          style={[styles.text, styles.labelText, styles.body]}
                        >
                          コク
                        </Text>
                        <Text style={[styles.text, styles.valueText]}>
                          {record.body}
                        </Text>
                      </View>
                      <View style={styles.aromaContainer}>
                        <Text
                          style={[styles.text, styles.labelText, styles.aroma]}
                        >
                          香り
                        </Text>
                        <Text style={[styles.text, styles.valueText]}>
                          {record.aroma}
                        </Text>
                      </View>
                      <View style={styles.aftertasteContainer}>
                        <Text
                          style={[
                            styles.text,
                            styles.labelText,
                            styles.aftertaste,
                          ]}
                        >
                          後味
                        </Text>
                        <Text style={[styles.text, styles.valueText]}>
                          {record.aftertaste}
                        </Text>
                      </View>
                      <View style={styles.radarChartContainer}>
                        <Text
                          style={[
                            styles.text,
                            styles.labelText,
                            styles.radarChart,
                          ]}
                        >
                          radarChart
                        </Text>
                        <View style={styles.recordRadarChart}>
                          <RadarChart
                            data={{
                              acidity: Number(record.acidity) || 0,
                              bitterness: Number(record.bitterness) || 0,
                              sweetness: Number(record.sweetness) || 0,
                              body: Number(record.body) || 0,
                              aroma: Number(record.aroma) || 0,
                              aftertaste: Number(record.aftertaste) || 0,
                            }}
                          />
                        </View>
                      </View>
                      <View style={styles.memoContainer}>
                        <Text
                          style={[styles.text, styles.labelText, styles.memo]}
                        >
                          MEMO
                        </Text>
                        <Text style={[styles.text, styles.valueText]}>
                          {record.memo}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteRecord(record.id)}
                      >
                        <Text style={styles.deleteButtonText}>削除</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            {/* 縦方向にスクロールするコンテンツ */}
          </ScrollView>
        </View>
      </View>
    </View>
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
    flex: 1, // flex: 1 を追加
    width: "100%",
    marginHorizontal: "auto",
    top: 210,
    bottom: 0,
  },
  scrollContainer: {
    alignItems: "center", // 子要素を中央揃え
    paddingVertical: 20,
    paddingBottom: 40, // スクロール時の下部余白を追加
  },
  innerScrollContainer: {
    flexDirection: "row", // 子要素を横方向に配置
  },
  recordContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: "auto",
    marginVertical: 50,
  },
  recordItem: {
    width: 300,
    height: "auto",
    marginHorizontal: 20,
    flexDirection: "column",
    textAlign: "center",
  },
  recordImagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginHorizontal: "auto",
    backgroundColor: "#F0F0F0", // デフォルト画像がない場合の背景色
  },
  recordRadarChart: { margin: 20, width: "auto", height: "auto" },
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
  imageUriContainer: {},
  nameContainer: {},
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
  memoContainer: {},
  imageUri: {
    // imageUri スタイル
    width: "auto",
    height: "auto",
  },
  name: {
    // name スタイル
  },
  variety: {
    // variety スタイル
  },
  productionArea: {
    // productionArea スタイル
  },
  roastingDegree: {
    // roastingDegree スタイル
  },
  extractionMethod: {
    // extractionMethod スタイル
  },
  extractionMaker: {
    // extractionMaker スタイル
  },
  grindSize: {
    // grindSize スタイル
  },
  temperature: {
    // temperature スタイル
  },
  coffeeAmount: {
    // coffeeAmount スタイル
  },
  waterAmount: {
    // waterAmount スタイル
  },
  extractionTime: {
    // extractionTime スタイル
  },
  acidity: {
    // acidity スタイル
  },
  sweetness: {
    // sweetness スタイル
  },
  bitterness: {
    // bitterness スタイル
  },
  body: {
    // body スタイル
  },
  aroma: {
    // aroma スタイル
  },
  aftertaste: {
    // aftertaste スタイル
  },
  radarChart: {
    // radarChart スタイル
  },
  memo: {
    // memo スタイル
  },
  text: {
    color: "#000",
    fontSize: 18,
  },
});
