import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, Image, StyleSheet } from "react-native";

import HeaderComponent from "../../components/HeaderComponent";
import PageTitleComponent from "../../components/PageTitleComponent";
import CoffeeStorageService from "../../services/CoffeeStorageService";
import { CoffeeRecord } from "../../types/CoffeeTypes"; // CoffeeRecordの型定義をインポート
import RadarChart from "../../components/RadarChart/RadarChart";

export default function ListScreen() {
  const [coffeeRecords, setCoffeeRecords] = useState<CoffeeRecord[]>([]); // 型を明示的に指定

  const [rangeValues, setRangeValues] = useState({
    acidity: 5,
    bitter: 5,
    sweet: 5,
    rich: 5,
    aroma: 5,
    aftertaste: 5,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const records = await CoffeeStorageService.getAllCoffeeRecords();
        setCoffeeRecords(records);
        await rangePreview(); // 関数を呼び出す
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };
    fetchData();
  }, []);

  async function rangePreview() {
    // async 関数として定義
    coffeeRecords.map((record) =>
      setRangeValues({
        ...rangeValues,
        acidity: Number(record.acidity),
        bitter: Number(record.bitterness),
        sweet: Number(record.sweetness),
        rich: Number(record.body),
        aroma: Number(record.aroma),
        aftertaste: Number(record.aftertaste),
      })
    );
  }

  const TextData = "Coffee List"; // ��ージタイトルに表示するテキスト

  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        {/* ヘッダーコンポーネントを配置 */}
        <HeaderComponent />
        <PageTitleComponent TextData={TextData} />
        <View style={[styles.absoluteBox, styles.mainContents]}>
          <ScrollView style={{ flex: 1 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.innerScrollContainer}
            >
              <View style={styles.recordContainer}>
                {coffeeRecords.map((record) => (
                  <View key={record.id} style={styles.recordItem}>
                    <View style={styles.imageUriContainer}>
                      <Text
                        style={[styles.text, styles.labelText, styles.imageUri]}
                      >
                        画像
                      </Text>
                      <Image
                        source={{ uri: `file://${record.imageUri}` }}
                        style={styles.recordImagePreview}
                      />
                    </View>
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
                    <View style={styles.varietyContainer}>
                      <Text
                        style={[styles.text, styles.labelText, styles.variety]}
                      >
                        種類
                      </Text>
                      <Text style={[styles.text, styles.valueText]}>
                        {record.variety}
                      </Text>
                    </View>
                    <View style={styles.originContainer}>
                      <Text
                        style={[styles.text, styles.labelText, styles.origin]}
                      >
                        産地
                      </Text>
                      <Text style={[styles.text, styles.valueText]}>
                        {record.origin}
                      </Text>
                    </View>
                    <View style={styles.roastLevelContainer}>
                      <Text
                        style={[
                          styles.text,
                          styles.labelText,
                          styles.roastLevel,
                        ]}
                      >
                        焙煎度
                      </Text>
                      <Text style={[styles.text, styles.valueText]}>
                        {record.roastLevel}
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
                        style={[styles.text, styles.labelText, styles.acidity]}
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
                            acidity: Number(record.acidity),
                            bitter: Number(record.bitterness),
                            sweet: Number(record.sweetness),
                            rich: Number(record.body),
                            aroma: Number(record.aroma),
                            aftertaste: Number(record.aftertaste),
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
                  </View>
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
    width: "100%",

    marginHorizontal: "auto",
    top: 210,
    bottom: 0, // 画面の下部まで拡張
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
  imageUriContainer: {},
  nameContainer: {},
  varietyContainer: {},
  originContainer: {},
  roastLevelContainer: {},
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
  origin: {
    // origin スタイル
  },
  roastLevel: {
    // roastLevel スタイル
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
    // aftertaste スタイル
  },
  memo: {
    // memo スタイル
  },
  text: {
    color: "#000",
    fontSize: 18,
  },
});
