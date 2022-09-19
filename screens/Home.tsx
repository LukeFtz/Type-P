import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Logo from "../components/geral/Logo";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../utilities/types";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("screen");

type screenNavigationProp = StackScreenProps<RootStackParamList, "Home">;

const Home: React.FC<screenNavigationProp> = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Raleway: require("../assets/fonts/Raleway-Regular.ttf"),
    ZenLight: require("../assets/fonts/ZenKakuGothicAntique-Light.ttf"),
    ZenBold: require("../assets/fonts/ZenKakuGothicAntique-Bold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const navigateToNextScreen = () => {
    navigation.navigate("Type");
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.viewLogo}>
        <Logo />
      </View>
      <Text style={styles.textTitle}>Type-P</Text>
      <TouchableOpacity onPress={navigateToNextScreen}>
        <LinearGradient
          colors={["#42C3A1", "#fff"]}
          style={styles.btnBorderView}
        >
          <LinearGradient colors={["#CBEED5", "#fff"]} style={styles.btnView}>
            <Text style={styles.txtBtn}>RECICLAR</Text>
          </LinearGradient>
        </LinearGradient>
      </TouchableOpacity>
      <StatusBar style="dark" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textTitle: {
    fontFamily: "Raleway",
    fontSize: 30,
    color: "#585858",
    marginBottom: 40,
  },
  btnView: {
    width: width / 1.2,
    height: width / 1.2,
    borderRadius: width / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  btnBorderView: {
    width: width / 1.15,
    height: width / 1.15,
    borderRadius: width / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  txtBtn: {
    fontFamily: "ZenLight",
    color: "#1C896C",
    fontSize: 40,
  },
  viewLogo: {
    width: 191,
    height: 214,
  },
});
