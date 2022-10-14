import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Logo from "../components/geral/Logo";
import { RootStackParamList } from "../utilities/types";

// import { Container } from './styles';
const { width, height } = Dimensions.get("screen");

type screenNavigationProp = StackScreenProps<
  RootStackParamList,
  "StabilizingCommunication"
>;

const StabilizingCommunication: React.FC<screenNavigationProp> = ({
  route,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.row}>
          <Text style={styles.textLabelApproved}>Conectado a </Text>
          <Text style={styles.txtLabelBold}>{route.params.ssid}</Text>
        </View>
        <Text style={styles.textLabel}>Estabelecendo comunicação</Text>
        <View style={styles.viewLogo}>
          <Logo />
        </View>
        <Text style={styles.textLabel}>Aguarde um instante</Text>
      </View>
    </View>
  );
};

export default StabilizingCommunication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textLabel: {
    fontFamily: "ZenLight",
    fontSize: 20,
    color: "#000",
    textAlign: "center",
  },
  textLabelApproved: {
    fontFamily: "ZenLight",
    fontSize: 16,
    color: "#000",
  },
  txtLabelBold: {
    color: "#000",
    fontFamily: "ZenBold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
  },
  topView: {
    height: height * 0.55,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  viewLogo: {
    width: 150,
    height: 160,
  },
});
