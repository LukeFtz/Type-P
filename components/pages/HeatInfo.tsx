import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getTemp, getWebSocket } from "../../utilities/controler";
import { communication, InScreen } from "../../utilities/types";

const { height } = Dimensions.get("screen");
let websocket: WebSocket;

const HeatInfo: React.FC<InScreen> = ({ apperInScreen }) => {
  const [currentTemp, setCurrentTemp] = useState<number | string>(100);
  const [tempDef, setTempDef] = useState<number>(0);
  let temporaryIndex = true;

  const getTempt = async () => {
    const aux: number = await getTemp();
    setTempDef(aux);
  };
  const onSocketMessage = (e: MessageEvent) => {
    // websocket.onmessage = (e) => {
    console.log(e);
    const message: communication = JSON.parse(e.data);
    if (message.func === "OVEN_TEMP" && message.val && message.token) {
      setCurrentTemp(message.val);
    }
    // };
  };

  const temporaryFunc = () => {
    if (temporaryIndex) {
      temporaryIndex = false;
      const temporaryVal = JSON.stringify({
        func: "SEND_VAL",
        token: "$Xip%meT",
      });
      websocket.send(temporaryVal);
    } else {
      const temporaryVal = JSON.stringify({
        func: "SEND_COMPLETE",
        token: "$Xip%meT",
      });
      websocket.send(temporaryVal);
    }
  };

  useEffect(() => {
    websocket = getWebSocket();
    getTempt();
    websocket.addEventListener("message", (e) => onSocketMessage(e));

    return websocket.removeEventListener("message", (e) => onSocketMessage(e));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.viewMainConten}>
        <View style={styles.centerObj}>
          <Text style={styles.txtLabel}>Temperatura Atual</Text>
          <Text style={styles.txtCurrentTemp}>{currentTemp}°</Text>
          <View style={styles.viewTempDef}>
            <Text style={styles.txtLabel}>Temperatura Definida </Text>
            <Text style={styles.txtTempDef}> {tempDef}°</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={temporaryFunc}>
            <View style={styles.btnCancel}>
              <Text style={styles.txtBtnCancel}>Cancelar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default React.memo(HeatInfo);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  centerObj: {
    alignItems: "center",
  },
  viewMainConten: {
    height: height * 0.7,
    justifyContent: "space-evenly",
  },
  txtLabel: {
    color: "#000",
    fontSize: 20,
    fontFamily: "ZenLight",
  },
  txtCurrentTemp: {
    color: "#FF0000",
    fontSize: 100,
    fontFamily: "ZenLight",
  },
  viewTempDef: {
    flexDirection: "row",
    alignItems: "center",
  },
  txtTempDef: {
    color: "#018865",
    fontFamily: "ZenLight",
    fontSize: 30,
  },
  btnCancel: {
    backgroundColor: "#890404",
    justifyContent: "center",
    alignItems: "center",
    width: 159,
    height: 51,
  },
  txtBtnCancel: {
    color: "#fff",
    fontFamily: "ZenLight",
    fontSize: 20,
  },
});
