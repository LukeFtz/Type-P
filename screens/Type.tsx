import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Forward from "../components/geral/Forward";
import Logo from "../components/geral/Logo";
import { RootStackParamList } from "../utilities/types";

const { width } = Dimensions.get("screen");

type screenNavigationProp = StackScreenProps<RootStackParamList, "Type">;

const Type: React.FC<screenNavigationProp> = (navigationProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoView}>
        <Logo />
      </View>
      <Text style={styles.textTitle}>Tipo de Plástico</Text>
      <View style={styles.centerize}>
        <Text style={styles.txtPlasticLabels}>Tipo</Text>
        <Text style={styles.txtPlasticType}>2</Text>
        <Text style={styles.txtPlasticLabels}>PEBD</Text>
      </View>
      <View style={styles.viewBtn}>
        <Forward goTo="CONFIGIGURATION" {...navigationProps} />
      </View>
    </View>
  );
};

export default Type;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textTitle: {
    fontFamily: "ZenLight",
    fontSize: 20,
    color: "#000",
  },
  logoView: {
    width: 124,
    height: 136,
  },
  centerize: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 50,
  },
  txtPlasticLabels: {
    fontFamily: "ZenLight",
    color: "#095E47",
    fontSize: 40,
  },
  txtPlasticType: {
    fontFamily: "ZenLight",
    color: "#095E47",
    fontSize: 70,
  },
  viewBtn: {
    width,
    alignItems: "flex-end",
    marginRight: 30,
  },
});
