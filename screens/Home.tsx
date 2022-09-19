import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Logo from "../components/geral/Logo";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("screen");

const Home: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Raleway: require("../assets/fonts/Raleway-Regular.ttf"),
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
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.textTitle}>Type-P</Text>
      <View>
        <LinearGradient
          colors={["#42C3A1", "#fff"]}
          style={styles.btnView}
        ></LinearGradient>
      </View>
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
  },
  btnView: {
    width: width / 1.2,
    height: width / 1.2,
    borderRadius: width / 2,
    borderWidth: 5,
    borderTopColor: "#42C3A1",
    borderBottomColor: "#fff",
  },
});
