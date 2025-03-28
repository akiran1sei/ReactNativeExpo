import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, StyleSheet } from "react-native";

import HeaderComponent from "../../components/HeaderComponent";
import PageTitleComponent from "../../components/PageTitleComponent";
import CoffeeStorageService from "../../services/CoffeeStorageService";
import { CoffeeRecord } from "../../types/CoffeeTypes"; // CoffeeRecordの型定義をインポート
export default function ListScreen() {
  const [coffeeRecords, setCoffeeRecords] = useState<CoffeeRecord[]>([]); // 型を明示的に指定
  useEffect(() => {
    const fetchData = async () => {
      try {
        const records = await CoffeeStorageService.getAllCoffeeRecords();
        setCoffeeRecords(records);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };
    fetchData();
  }, []);
  const TextData = "Coffee List"; // ��ージタイトルに表示するテキスト
  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        {/* ヘッダーコンポーネントを配置 */}
        <HeaderComponent />
        <PageTitleComponent TextData={TextData} />
        <View style={[styles.absoluteBox, styles.mainContents]}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={true}
          >
            {coffeeRecords.map((record) => (
              <View key={record.id}>
                <Text>{record.name}</Text>
                <Text>{record.variety}</Text>
                <Text>{record.origin}</Text>
                <Text>{record.roastLevel}</Text>
                <Text>{record.extractionMethod}</Text>
                <Text>{record.extractionMaker}</Text>
                <Text>{record.grindSize}</Text>
                <Text>{record.temperature}</Text>
                <Text>{record.coffeeAmount}</Text>
                <Text>{record.waterAmount}</Text>
                <Text>{record.extractionTime}</Text>
                <Text>{record.acidity}</Text>
                <Text>{record.bitterness}</Text>
                <Text>{record.sweetness}</Text>
                <Text>{record.body}</Text>
                <Text>{record.aroma}</Text>
                <Text>{record.aftertaste}</Text>
                <Text>{record.memo}</Text>
                <Text>{record.imageUri}</Text>
                {/* 他のレコードのプロパティを表示 */}
              </View>
            ))}
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
