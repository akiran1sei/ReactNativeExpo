import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Picker をインポート

const SelectComponent = (props: { dataTitle: string }) => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const methods = [
    { label: "ハンドドリップ", value: "handdrip" },
    { label: "フレンチプレス", value: "frenchpress" },
    { label: "エスプレッソ", value: "espresso" },
    { label: "水出し", value: "icedrip" },
  ];

  return (
    <View style={styles.selectContainer}>
      <Text style={styles.label}>{props.dataTitle}</Text>
      <Picker
        selectedValue={selectedMethod}
        onValueChange={(itemValue) => setSelectedMethod(itemValue)}
        style={styles.select} // スタイルはinputのまま
      >
        <Picker.Item label="選択してください" value="" />
        {methods.map((method) => (
          <Picker.Item
            key={method.value}
            label={method.label}
            value={method.value}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  selectContainer: {
    width: "90%",
    marginBottom: 10,
    marginHorizontal: "auto",
  },
  label: {
    width: "100%",
    backgroundColor: "#D2B48C",
    color: "#000",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    textAlign: "center",
  },
  select: {
    width: "100%",
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "#D2B48C",
    marginTop: -1,
    paddingVertical: 16, // 1rem をピクセルに変換 (1rem = 16px)
    paddingHorizontal: 0,
    fontSize: 18,
  },
});

export default SelectComponent;
