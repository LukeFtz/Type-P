import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Logo from "../components/geral/Logo";
import Finished from "../components/icons/Finished";
import GoToHomePage from "../components/pages/GoToHomePage";
import { RootStackParamList } from "../utilities/types";

// import { Container } from './styles';
type screenNavigationProp = StackScreenProps<
  RootStackParamList,
  "FinishedScreen"
>;

const { height, width } = Dimensions.get("screen");

const FinishedScreen: React.FC<screenNavigationProp> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.viewLogo}>
          <Logo />
        </View>
        <View style={styles.alignItemsCenter}>
          <Text style={styles.txtLabel}>Reciclagem Finalizada</Text>
          <View style={styles.viewIcon}>
            <Finished />
          </View>
        </View>
      </View>
      <View style={styles.bottomView}>
        <GoToHomePage {...props} />
      </View>
    </View>
  );
};

export default FinishedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  txtLabel: {
    fontFamily: "ZenLight",
    color: "#000",
    fontSize: 30,
  },
  topView: {
    height: height * 0.6,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bottomView: {
    height: height * 0.3,
    width,
    justifyContent: "center",
    paddingLeft: 20,
    // alignItems: "center",
  },
  alignItemsCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  viewLogo: {
    width: 200,
    height: 230,
  },
  viewIcon: {
    marginTop: 10,
    width: 50,
    height: 50,
  },
});
