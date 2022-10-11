import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../utilities/types";
import Logo from "../components/geral/Logo";
import BtnHeat from "../components/custom/BtnHeat";
import HeatInfo from "../components/pages/HeatInfo";
import { getWebSocket } from "../utilities/controler";

type screenNavigationProp = StackScreenProps<RootStackParamList, "Heat">;

const Heat: React.FC<screenNavigationProp> = ({ navigation }) => {
  const [showBtn, setShowBtn] = useState<boolean>(true);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [btnOnScreen, setBtnOnScreen] = useState<boolean>(true);
  const [infoOnScreen, setInfoOnScreen] = useState<boolean>(false);

  useEffect(() => {
    const websocket = getWebSocket();
    websocket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log(message);
      if (message.func === "OVEN_HEATING" && message.token) {
        setShowBtn(false);
        setInfoOnScreen(true);
        setTimeout(() => {
          setShowInfo(true);
          setBtnOnScreen(false);
        }, 500);
      } else if (message.func === "HEAT_COMPLETE" && message.token) {
        navigation.navigate("Recycle");
      } else if (message.func === "PROCESS_CANCELED" && message.token) {
        setInfoOnScreen(false);
        setBtnOnScreen(true);
        setTimeout(() => {
          setShowBtn(true);
          setShowInfo(false);
        }, 500);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.upperContend}>
        {btnOnScreen && <BtnHeat apperInScreen={showBtn} />}
        {showInfo && <HeatInfo apperInScreen={infoOnScreen} />}
      </View>
      <View style={styles.lowerContend}>
        <View style={styles.logoView}>
          <Logo />
        </View>
      </View>
    </View>
  );
};

export default Heat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  upperContend: {
    flex: 2,
  },
  lowerContend: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoView: {
    width: 103,
    height: 124,
  },
});
