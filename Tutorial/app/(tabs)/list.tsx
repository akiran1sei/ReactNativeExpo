import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { IconButton } from "react-native-paper";

export default function ListScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.contents}>
        <View style={styles.absoluteBox}>
          <View style={styles.header}>
            <View style={[styles.buttons, styles.headerButtons]}>
              <Link href="/" style={styles.button}>
                <IconButton icon="home" size={50} iconColor="#D2B48C" />
              </Link>
              <View style={styles.border}></View>
              <Link href="/create" style={styles.button}>
                <IconButton icon="plus" size={50} iconColor="#D2B48C" />
              </Link>
              <View style={styles.border}></View>
              <Link href="/list" style={styles.button}>
                <IconButton icon="view-list" size={50} iconColor="#D2B48C" />
              </Link>
            </View>
          </View>
        </View>
        <Text style={styles.text}>List screen</Text>
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
    paddingVertical: 20,
  },
  absoluteBox: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 100, // 高さを指定（必要に応じて）
  },
  header: {
    width: "100%",
    backgroundColor: "#6F4E37",
  },
  buttons: {},
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    width: 100,
    textAlign: "center",

    textDecorationLine: "underline",
    marginVertical: 10,
  },

  border: { width: 1, height: 60, backgroundColor: "#D2B48C" },
  text: {
    color: "#000",
    fontSize: 18,
  },
});
