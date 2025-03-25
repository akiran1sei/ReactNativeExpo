import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";

const TextAreaComponent = () => {
  const [inputText, setInputText] = useState("");

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>MEMO</Text>
      <TextInput
        style={styles.textarea}
        onChangeText={setInputText}
        value={inputText}
        placeholder="入力してください"
        placeholderTextColor="#D3D3D3"
        multiline={true}
        numberOfLines={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "90%", // 幅を90%に設定
    marginBottom: 10, // 下マージンを追加
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

  textarea: {
    width: "100%",
    backgroundColor: "#FFF", // 入力欄の背景色
    padding: 10, // 入力欄のパディング
    borderBottomLeftRadius: 10, // 左下の角丸
    borderBottomRightRadius: 10, // 右下の角丸
    borderWidth: 1, // 枠線の太さ
    borderColor: "#D2B48C", // 枠線の色
    marginTop: -1, // ラベルとの隙間をなくす
    height: 100, // テキストエリアの高さを設定
    textAlignVertical: "top", // テキストを上から配置
  },
});

export default TextAreaComponent;
