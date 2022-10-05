import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  connectToRedisServer,
  defineSettings,
  getToken,
} from "../../utilities/controler";
import { navigationPropsConfigOven } from "../../utilities/types";

const ConfigOven: React.FC<navigationPropsConfigOven> = ({ navigation }) => {
  const [disableButton, setDisableButton] = useState<boolean>(false);
  let websocket: WebSocket;

  const goToNextPage = async () => {
    setDisableButton(true);
    let token: string;
    websocket = connectToRedisServer();
    getToken();
    websocket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log(message);
      if (message.func === "TOKEN") {
        token = message.token;
        defineSettings(token);
      } else if (message.func === "OVEN_SETTED" && message.token) {
        navigation.navigate("Heat");
      }
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txtBtn}>Configurar Forno</Text>
      <TouchableOpacity onPress={goToNextPage} disabled={disableButton}>
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

export default ConfigOven;

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
