import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const NumberComponent = (props: { dataTitle: string }) => {
  const [inputValue, setInputValue] = useState("0"); // 初期値を文字列"0"とする
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (text: string) => {
    // 数値のみを受け付けるようにフィルタリング
    const filteredText = text.replace(/[^0-9]/g, ""); // 小数点削除
    setInputValue(filteredText);
  };

  const handleBlur = () => {
    setIsFocused(false);
    let currentValue = parseInt(inputValue, 10) || 0; // パースの追加
    if (currentValue < 0) {
      setInputValue("0");
    } else {
      setInputValue(currentValue.toString());
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{props.dataTitle}</Text>
      <TextInput
        style={[styles.numberInput, isFocused && styles.focusedInput]}
        value={inputValue}
        onChangeText={handleInputChange}
        keyboardType="number-pad" // 数値入力用のキーボードを表示
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
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
  numberInput: {
    width: "100%",
    height: 40,
    backgroundColor: "#FFF",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "#FFF",
    paddingHorizontal: 10,
    fontSize: 18,
  },
  focusedInput: {
    borderColor: "#D2B48C", // フォーカス時のボーダーカラー
    borderWidth: 1,
  },
});

export default NumberComponent;
