import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../utilities/types";
import Logo from "../components/geral/Logo";
import BtnRecycle from "../components/pages/BtnRecycle";
import { getWebSocket } from "../utilities/controler";
import RecycleInfo from "../components/pages/RecycleInfo";

type screenNavigationProp = StackScreenProps<RootStackParamList, "Recycle">;

const Recycle: React.FC<screenNavigationProp> = ({ navigation }) => {
  const [showBtn, setShowBtn] = useState<boolean>(true);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [btnOnScreen, setBtnOnScreen] = useState<boolean>(true);
  const [infoOnScreen, setInfoOnScreen] = useState<boolean>(false);

  const ovenCommunication = (e: MessageEvent) => {
    // websocket.onmessage = (e) => {
    const message = JSON.parse(e.data);
    console.log(message);
    if (message.func === "OVEN_RECYCLING" && message.token) {
      setShowBtn(false);
      setTimeout(() => {
        setBtnOnScreen(false);
        setInfoOnScreen(true);
        setShowInfo(true);
      }, 500);
    } else if (message.func === "HEAT_COMPLETE" && message.token) {
      navigation.navigate("Recycle");
    }
    // };
  };

  useEffect(() => {
    const websocket = getWebSocket();
    websocket.addEventListener("message", (e) => ovenCommunication(e));
    return websocket.removeEventListener("message", (e) =>
      ovenCommunication(e)
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.upperContend}>
        {btnOnScreen && <BtnRecycle apperInScreen={showBtn} />}
        {showInfo && <RecycleInfo apperInScreen={infoOnScreen} />}
      </View>
      <View style={styles.lowerContend}>
        <View style={styles.logoView}>
          <Logo />
        </View>
      </View>
    </View>
  );
};

export default Recycle;

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
