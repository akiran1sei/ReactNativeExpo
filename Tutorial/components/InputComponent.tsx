import React, { useState } from "react";

import { View, StyleSheet, TextInput, Text } from "react-native";

const InputComponent = (props: { dataTitle: string }) => {
  const [inputText, setInputText] = useState("");

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{props.dataTitle}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInputText}
        value={inputText}
        placeholder="入力してください"
        placeholderTextColor="#D3D3D3"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "90%", // 幅を80%に設定

    marginBottom: 20, // 下マージンを追加

    marginHorizontal: "auto", // 左右マージンをautoに設定
  },

  label: {
    width: "100%",

    backgroundColor: "#D2B48C", // ラベルの背景色

    color: "#000", // ラベルの文字色

    padding: 10, // ラベルのパディング

    borderTopLeftRadius: 10, // 左上の角丸

    borderTopRightRadius: 10, // 右上の角丸

    textAlign: "center", // テキストを中央に配置
  },

  input: {
    width: "100%",

    backgroundColor: "#FFF", // 入力欄の背景色

    padding: 10, // 入力欄のパディング

    borderBottomLeftRadius: 10, // 左下の角丸

    borderBottomRightRadius: 10, // 右下の角丸

    borderWidth: 1, // 枠線の太さ

    borderColor: "#FFF", // 枠線の色

    marginTop: -1, // ラベルとの隙間をなくす
  },
});

export default InputComponent;
