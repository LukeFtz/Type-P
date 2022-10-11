import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Logo from "../geral/Logo";

// import { Container } from './styles';
const { height } = Dimensions.get("screen");

const WaitingConnetion: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoSize}>
        <Logo />
      </View>
      <Text style={styles.textLabel}>Aguardando conexão</Text>
    </View>
  );
};

export default React.memo(WaitingConnetion);

const styles = StyleSheet.create({
  container: {
    // justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textLabel: {
    fontFamily: "ZenLight",
    fontSize: 20,
    color: "#000",
  },
  logoSize: {
    height: height * 0.15,
    width: height * 0.15,
  },
});
