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
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{props.dataTitle}</Text>
      <Picker
        selectedValue={selectedMethod}
        onValueChange={(itemValue) => setSelectedMethod(itemValue)}
        style={styles.input} // スタイルはinputのまま
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
  inputContainer: {
    width: "90%",
    marginBottom: 20,
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
  input: {
    // スタイル名はinputのまま
    width: "100%",
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "#FFF",
    marginTop: -1,
  },
});

export default SelectComponent;
