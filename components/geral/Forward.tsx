import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { navigationProps } from "../../utilities/types";
import { setItemAsync } from "expo-secure-store";
import { convertTime } from "../../utilities/values";
import {
  ovenConfig,
  ovenConnectedStatus,
  selectConfigurated,
} from "../../src/reducers/reducer";
import { useDispatch, useSelector } from "react-redux";
import {
  setDefaultValues,
  resetOvenConfiguration,
} from "../../utilities/controler";
import store from "../../src/storage";

const Forward: React.FC<navigationProps> = ({
  goTo,
  navigation,
  tempo,
  temperatura,
}) => {
  const ovenConnected = useSelector(ovenConnectedStatus);
  const ovenConfigurated = useSelector(selectConfigurated);
  const dispatch = useDispatch();
  const saveInfo = () => {
    setItemAsync("stringTime", tempo + "");
    const timeInSeconds = convertTime(tempo + "");
    const storage = {
      time: timeInSeconds,
      temperature: temperatura,
    };
    setItemAsync("storage", JSON.stringify(storage));
  };

  const goToNextPage = () => {
    if (goTo === "CONFIGIGURATION") {
      navigation.navigate("Configuration");
    }
    if (goTo === "CONFIGURATE_WIFI") {
      saveInfo();
      if (ovenConnected) {
        if (ovenConfigurated) {
          resetOvenConfiguration();
          store.dispatch(ovenConfig(false));
        }
        dispatch({ type: "setDefaultReducerValues" });
        navigation.navigate("StabilizingCommunication", { ssid: "Wifi" });
      } else {
        setDefaultValues();
        dispatch({ type: "setDefault" });
        navigation.navigate("WifiConfigurations");
      }
    }
    if (goTo === "SELECT_WIFI") {
      navigation.navigate("SelectWifi");
    }
    if (goTo === "COFIGURAR_FORNO") {
      saveInfo();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txtBtn}>Prosseguir</Text>
      <TouchableOpacity onPress={goToNextPage}>
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
      </TouchableOpacity>
    </View>
  );
};

export default Forward;

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
    marginRight: 10,
  },
});
