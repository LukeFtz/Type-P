import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { communication, InScreen } from "../../utilities/types";
import { getTime, getWebSocket } from "../../utilities/controler";
import RecycleProcess from "../custom/RecycleProcess";
import { TouchableOpacity } from "react-native-gesture-handler";

// import { Container } from './styles';
const { width } = Dimensions.get("screen");
let websocket: WebSocket;

const RecicleInfo: React.FC<InScreen> = ({ apperInScreen }) => {
  const [timeDef, setTimeDef] = useState<string>("");
  const [currentTemp, setCurrentTemp] = useState<number | string>(100);
  let temporaryIndex = true;

  const getTimeDef = async () => {
    const aux: string = await getTime();
    setTimeDef(aux);
  };

  const onSocketMessage = (e: MessageEvent) => {
    console.log(e);
    const message: communication = JSON.parse(e.data);
    if (message.func === "OVEN_TEMP" && message.val && message.token) {
      setCurrentTemp(message.val);
    }
  };

  useEffect(() => {
    websocket = getWebSocket();
    getTimeDef();
    websocket.addEventListener("message", (e) => onSocketMessage(e));

    return websocket.removeEventListener("message", (e) => onSocketMessage(e));
  }, []);

  const temporaryFunc = () => {
    if (temporaryIndex) {
      temporaryIndex = false;
      const temporaryVal = JSON.stringify({
        func: "SEND_VAL",
        token: "$Xip%meT",
      });
      websocket.send(temporaryVal);
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.spacingContent}> */}
      <View style={styles.centerialize}>
        <View style={styles.viewText}>
          <Text style={styles.txtLabel}>Tempo Definido </Text>
          <Text style={styles.txtLabelBold}> {timeDef}</Text>
        </View>
        <View style={styles.viewText}>
          <Text style={styles.txtLabel}>Tempo Atual </Text>
          <Text style={styles.txtLabelBoldGreen}> {timeDef}</Text>
        </View>
      </View>
      <View style={styles.centerialize}>
        <RecycleProcess timeDefined={30} />
      </View>
      <View style={styles.centerialize}>
        <Text style={styles.txtLabelTemp}>{currentTemp}°</Text>
      </View>
      <View style={styles.viewBtnCancel}>
        <TouchableOpacity onPress={temporaryFunc}>
          <View style={styles.btnCancel}>
            <Text style={styles.txtBtnCancel}>Cancelar</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </View>
  );
};

export default React.memo(RecicleInfo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  centerialize: {
    justifyContent: "center",
    alignItems: "center",
  },
  viewText: {
    flexDirection: "row",
  },
  txtLabel: {
    color: "#000",
    fontSize: 20,
    fontFamily: "ZenLight",
  },
  txtLabelTemp: {
    color: "#FF1F00",
    fontSize: 30,
    fontFamily: "ZenLight",
  },
  txtLabelBold: {
    color: "#000",
    fontSize: 20,
    fontFamily: "ZenBold",
  },
  txtLabelBoldGreen: {
    color: "#03795A",
    fontSize: 25,
    fontFamily: "ZenBold",
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
  viewBtnCancel: {
    width: width * 0.9,
  },
});
