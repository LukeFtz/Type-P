import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectConfigurated } from "../../src/reducers/reducer";
import { configureOvenSettings } from "../../utilities/controler";
import { navigationPropsConfigOven } from "../../utilities/types";

const ConfigOven: React.FC = () => {
  const ovenConfigurated = useSelector(selectConfigurated);
  const navigation = useNavigation<navigationPropsConfigOven>();
  const configureOven = () => {
    if (ovenConfigurated) {
      navigation.navigate("Heat");
    } else {
      configureOvenSettings();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txtBtn}>Configurar Forno</Text>
      <TouchableOpacity onPress={() => configureOven()}>
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

export default React.memo(ConfigOven);

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
