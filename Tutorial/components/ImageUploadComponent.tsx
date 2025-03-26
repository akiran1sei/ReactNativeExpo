import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface ImagePickerProps {
  onChange: (value: string) => void;
}
const ImageUploadComponent: React.FC<ImagePickerProps> = ({
  onChange, // props を受け取る
}) => {
  // デフォルト画像のURIを設定
  const defaultImage = require("@/assets/images/no-image.png"); // デフォルト画像へのパスを適宜変更してください

  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("画像を選択するには、カメラロールへのアクセス許可が必要です。");
      return;
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri;
        setImage(selectedUri);
        onChange(selectedUri); // 選択された画像の URI を親コンポーネントに送信
      }
    } catch (error) {
      console.error("画像の選択中にエラーが発生しました:", error);
      alert("画像の選択中にエラーが発生しました。");
    }
  };

  // 画像ソースを決定（ユーザーが選択した画像またはデフォルト画像）
  const imageSource = image ? { uri: image } : defaultImage;

  return (
    <View style={styles.uploadContainer}>
      <View style={styles.imageContents}>
        <TouchableOpacity onPress={pickImage} style={styles.imageButton}>
          <Text style={styles.buttonText}>画像を選択</Text>
        </TouchableOpacity>
        <Image source={imageSource} style={styles.imagePreview} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  uploadContainer: {
    width: "95%",
    height: "auto",
    backgroundColor: "#D2B48C",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10, // 下マージンを追加
  },
  imageContents: {
    width: "90%", // 幅を90%に設定
    marginBottom: 10, // 下マージンを追加
    marginHorizontal: "auto", // 左右マージンをautoに設定
  },
  imageButton: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#333",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    backgroundColor: "#F0F0F0", // デフォルト画像がない場合の背景色
  },
});

export default ImageUploadComponent;
