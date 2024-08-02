import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";

const colors = ["#FA4860", "#008080", "#BDDCDE", "#BDDCDE"];

const Loader = () => {
  const [currentColors, setCurrentColors] = useState(colors);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColors((prevColors) => {
        const newColors = [...prevColors];
        // @ts-ignore
        newColors.unshift(newColors.pop());
        return newColors;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topCircleContainer}>
        <View style={[styles.circle, { backgroundColor: currentColors[0] }]} />
      </View>
      <View style={styles.bottomContainer}>
        <View style={[styles.circle, { backgroundColor: currentColors[1] }]} />
        <View style={[styles.circle, { backgroundColor: currentColors[2] }]} />
        <View style={[styles.circle, { backgroundColor: currentColors[3] }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#061830",
  },
  topCircleContainer: {
    width: 120,
    alignItems: "flex-start",
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
    marginTop: 10,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default Loader;
