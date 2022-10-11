import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Finished from "../icons/Finished";

// import { Container } from './styles';
const { height } = Dimensions.get("screen");

const Connected: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.textLabel}>Conectado</Text>
        <View style={styles.iconSize}>
          <Finished />
        </View>
      </View>
    </View>
  );
};

export default React.memo(Connected);

const styles = StyleSheet.create({
  container: {
    // justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textLabel: {
    fontFamily: "ZenLight",
    fontSize: 20,
    color: "#075C46",
    marginRight: 20,
  },
  iconSize: {
    height: height * 0.12,
    width: height * 0.12,
  },
});
