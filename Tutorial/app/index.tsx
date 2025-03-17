import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { IconButton } from "react-native-paper";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.topMain}>
        <View style={styles.absoluteBox}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Coffee Note</Text>
          </View>
        </View>
        <View style={styles.buttons}>
          <Link href="/create" style={styles.button}>
            <IconButton icon="plus" size={50} />
          </Link>
          <Link href="/list" style={styles.button}>
            <IconButton icon="view-list" size={50} />
          </Link>
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
  topMain: {
    flex: 1,
    justifyContent: "center", // 縦方向の中心に配置
    alignItems: "center", // 横方向の中心に配置
    paddingVertical: 20,
  },
  absoluteBox: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100, // 高さを指定（必要に応じて）
  },
  title: {
    alignItems: "center",
    marginBottom: 50, // buttonsとの間隔を空ける
  },
  titleText: {
    fontFamily: "Caveat",
    color: "#D2B48C",
    fontSize: 48,
  },
  buttons: {
    flexDirection: "column",
  },
  button: {
    textDecorationLine: "underline",
    color: "#007BFF",
    backgroundColor: "#D2B48C",
    marginVertical: 10,
    borderRadius: 10,
  },
});
