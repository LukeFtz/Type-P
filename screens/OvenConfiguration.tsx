import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import ConfigOven from "../components/custom/ConfigOven";
import Logo from "../components/geral/Logo";
import { RootStackParamList } from "../utilities/types";

// import { Container } from './styles';

type screenNavigationProp = StackScreenProps<
  RootStackParamList,
  "OvenConfiguration"
>;

const { width } = Dimensions.get("screen");

const OvenConfiguration: React.FC<screenNavigationProp> = (navigateProps) => {
  return (
    <View style={[styles.container, styles.spacingItems]}>
      <View style={styles.centerItems}>
        <View style={styles.logoView}>
          <Logo />
        </View>
        <View>
          <Text style={styles.textTitle}>Tipo de Plástico</Text>
        </View>
      </View>
      <View style={styles.fullWidth}>
        <ConfigOven {...navigateProps} />
      </View>
    </View>
  );
};

export default OvenConfiguration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  centerItems: {
    alignItems: "center",
  },
  spacingItems: {
    justifyContent: "space-around",
  },
  logoView: {
    width: 223,
    height: 244,
  },
  textTitle: {
    fontFamily: "ZenLight",
    fontSize: 20,
    color: "#000",
  },
  fullWidth: {
    width,
    alignItems: "flex-end",
    marginRight: 50,
  },
});
