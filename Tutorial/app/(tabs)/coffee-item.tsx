// CoffeeItemScreen.tsx
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import HeaderComponent from "../../components/HeaderComponent";
import PageTitleComponent from "../../components/PageTitleComponent";
import CoffeeStorageService from "../../services/CoffeeStorageService"; // CoffeeStorageServiceをインポート
import { CoffeeRecord } from "../../types/CoffeeTypes"; // CoffeeRecordの型定義をインポート
type RouteParams = {
  id: string;
};
export default function CoffeeItemScreen() {
  const route = useRoute();
  const { id } = route.params as RouteParams; // 型アサーションを使用
  const [coffeeRecord, setCoffeeRecord] = useState<CoffeeRecord | null>(null); // コーヒーレコードの状態を管理
  const [loading, setLoading] = useState(true); // ローディング状態を管理

  useEffect(() => {
    const fetchCoffeeRecord = async () => {
      try {
        const record = await CoffeeStorageService.getCoffeeRecordById(id); // idに基づいてレコードを取得
        setCoffeeRecord(record);
      } catch (error) {
        console.error("コーヒーレコードの取得に失敗しました:", error);
      } finally {
        setLoading(false); // ローディング終了
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
    <View style={styles.container}>
      <View style={styles.contents}>
        {/* ヘッダーコンポーネントを配置 */}
        <HeaderComponent />
        <PageTitleComponent TextData={coffeeRecord.name} />

        <Text style={styles.text}>種類: {coffeeRecord.variety}</Text>
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

  text: {
    color: "#000",
    fontSize: 18,
  },
});
