import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RootStackParamList } from "../../utilities/types";
import { StackScreenProps } from "@react-navigation/stack";
import { CommonActions } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";

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
            >
              <Svg style={styles.transform} width={51} height={23} fill="none">
                <Path
                  d="M.44 10.092a1.5 1.5 0 000 2.122l9.545 9.546a1.5 1.5 0 102.122-2.122L3.62 11.153l8.486-8.485A1.5 1.5 0 109.985.546L.44 10.092zm50.04-.439H1.5v3h48.98v-3z"
                  fill="#414040"
                />
              </Svg>
            </LinearGradient>
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
