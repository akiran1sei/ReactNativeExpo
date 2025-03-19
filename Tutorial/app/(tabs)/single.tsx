import React from "react";
import { Text, View, StyleSheet } from "react-native";

import HeaderComponent from "../../components/HeaderComponent";
import PageTitleComponent from "../../components/PageTitleComponent";

export default function SingleScreen() {
  const TextData = "くりっくしたコーヒーの名前"; // ��ージタイトルに表示するテキスト
  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        {/* ヘッダーコンポーネントを配置 */}
        <HeaderComponent />
        <PageTitleComponent TextData={TextData} />

        <Text style={styles.text}>single screen</Text>
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
