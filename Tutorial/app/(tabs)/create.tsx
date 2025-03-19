import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import HeaderComponent from "@/components/HeaderComponent";
import PageTitleComponent from "@/components/PageTitleComponent";
import SelectComponent from "@/components/SelectComponent";
import InputComponent from "@/components/InputComponent";
import RangeComponent from "@/components/RangeComponent";
import NumberComponent from "@/components/NumberComponent";

export default function CreateScreen() {
  const TextData = "Coffee Create"; // ��ージタイトルに表示するテキスト
  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        {/* ヘッダーコンポーネントを配置 */}
        <HeaderComponent />
        <PageTitleComponent TextData={TextData} />
        <View style={[styles.absoluteBox, styles.mainContents]}>
          <InputComponent />
          <SelectComponent />
          <RangeComponent />
          <NumberComponent />
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
    justifyContent: "center", // 縦方向の中心に配置
    position: "absolute",
    left: 0,
    right: 0,
  },
  mainContents: { top: 210 },
  text: {
    color: "#000",
    fontSize: 18,
  },
});
