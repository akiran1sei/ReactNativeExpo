import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { FontAwesome } from "@expo/vector-icons";

interface RangeComponentProps {
  dataTitle: string;
  onChange: (value: number) => void; // onChange プロパティを追加
}

const RangeComponent: React.FC<RangeComponentProps> = ({
  dataTitle,
  onChange, // props を受け取る
}) => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleValueChange = (value: number) => {
    setSliderValue(value);
    onChange(value); // 値が変更されたときに onChange を呼び出す
  };

  const incrementValue = () => {
    if (sliderValue + 0.5 <= 5) {
      const newValue = parseFloat((sliderValue + 0.5).toFixed(1));
      setSliderValue(newValue);
      onChange(newValue); // 値が変更されたときに onChange を呼び出す
    }
  };

  const decrementValue = () => {
    if (sliderValue - 0.5 >= 0) {
      const newValue = parseFloat((sliderValue - 0.5).toFixed(1));
      setSliderValue(newValue);
      onChange(newValue); // 値が変更されたときに onChange を呼び出す
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{dataTitle}</Text>
      <View style={styles.sliderContainer}>
        <View style={styles.sliderAndButtons}>
          <TouchableOpacity onPress={decrementValue} style={styles.button}>
            <FontAwesome name="minus" size={20} color="#D2B48C" />
          </TouchableOpacity>
          <Slider
            style={{ width: "60%", height: 40 }}
            minimumValue={0}
            maximumValue={5}
            step={0.5}
            value={sliderValue}
            onValueChange={handleValueChange}
            minimumTrackTintColor="#D2B48C"
            maximumTrackTintColor="#FFF"
            thumbTintColor="#D2B48C"
          />
          <TouchableOpacity onPress={incrementValue} style={styles.button}>
            <FontAwesome name="plus" size={20} color="#D2B48C" />
          </TouchableOpacity>
        </View>
        <Text style={styles.valueText}>{sliderValue}</Text>
      </View>
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
  sliderContainer: {
    backgroundColor: "#FFF",
    paddingBottom: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: -1,
    alignItems: "center",
  },
  valueText: {
    color: "#000",
    marginTop: 10,
    fontSize: 16,
  },
  sliderAndButtons: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default RangeComponent;
