import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Configuration: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Tipo de Plástico</Text>
      <View></View>
    </View>
  );
};

export default Configuration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textTitle: {
    fontFamily: "ZenLight",
    fontSize: 20,
    color: "#000",
  },
});
