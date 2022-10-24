import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RootStackParamList } from "../../utilities/types";
import { StackScreenProps } from "@react-navigation/stack";
import { CommonActions } from "@react-navigation/native";

type props = StackScreenProps<RootStackParamList>;

const GoToHomePage: React.FC<props> = ({ navigation }) => {
  const goToNextPage = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "Home" }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToNextPage}>
        <View style={styles.transform}>
          <LinearGradient
            colors={["#42C3A1", "#fff"]}
            style={styles.btnBorderView}
            start={[1, 1]}
            end={[0, 1]}
          >
            <LinearGradient
              colors={["#CBEED5", "#fff"]}
              style={styles.btnView}
              start={[1, 1]}
              end={[0, 1]}
            ></LinearGradient>
          </LinearGradient>
        </View>
      </TouchableOpacity>
      <Text style={styles.txtBtn}>Retornar ao Inicio</Text>
    </View>
  );
};

export default GoToHomePage;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnView: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  btnBorderView: {
    width: 105,
    height: 105,
    borderRadius: 105 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  txtBtn: {
    fontFamily: "ZenLight",
    fontSize: 20,
    marginLeft: 10,
  },
  transform: {
    transform: [{ scaleX: -1 }],
  },
});
