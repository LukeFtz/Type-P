import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Connected from "../components/custom/Connected";
import WaitingConnetion from "../components/custom/WaitingConnetion";
import Forward from "../components/geral/Forward";
import Wifi from "../components/icons/Wifi";
import { RootStackParamList } from "../utilities/types";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import { OVEN_SERVER } from "../utilities/values";

// import { Container } from './styles';
type screenNavigationProp = StackScreenProps<
  RootStackParamList,
  "WifiConfigurations"
>;

const { width, height } = Dimensions.get("screen");

const WifiCOnfigurations: React.FC<screenNavigationProp> = (
  navigationProps
) => {
  const netInfo = useNetInfo();
  const [connected, setConnected] = useState<boolean>(false);
  const [showWaiting, setShowWaiting] = useState<boolean>(true);
  const [showConnected, setShowConnected] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  const getConnectionInfo = () => {
    fetch(OVEN_SERVER + "/")
      .then((response) => response.json())
      .then((json) => {
        if (json.typep === true) {
          setText("");
          setConnected(true);
        }
      })
      .catch((e) => {
        setText("Seleciona a rede correta");
        setConnected(false);
      });
  };

  useEffect(() => {
    if (connected === true) {
      setShowWaiting(false);
      setShowConnected(true);
    } else {
      setShowWaiting(true);
      setShowConnected(false);
    }
  }, [connected]);

  useEffect(() => {
    getConnectionInfo();
  }, [netInfo, netInfo.isConnected]);

  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        <Text style={styles.textLabel}>Conecte-se a rede wifi do forno</Text>
        <View style={styles.row}>
          <Wifi />
          <View style={styles.viewWifiSettings}>
            <View style={styles.row}>
              <Text style={styles.textLabel}>Rede : </Text>
              <Text style={styles.txtLabelBold}>Type-P</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.textLabel}>Senha : </Text>
              <Text style={styles.txtLabelBold}>6@Z*vW5a</Text>
            </View>
          </View>
        </View>
        <Text style={styles.txtLabelError}>{text}</Text>
      </View>
      <View style={styles.bottomView}>
        {showWaiting && <WaitingConnetion />}
        {showConnected && <Connected />}
      </View>
      <View style={styles.fullWidth}>
        {showConnected && <Forward goTo="SELECT_WIFI" {...navigationProps} />}
        {/* <Forward goTo="SELECT_WIFI" {...navigationProps} /> */}
      </View>
    </View>
  );
};

export default WifiCOnfigurations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textLabel: {
    fontFamily: "ZenLight",
    fontSize: 20,
    color: "#000",
  },
  txtLabelBold: {
    color: "#000",
    fontFamily: "ZenBold",
    fontSize: 20,
  },
  txtLabelError: {
    color: "#cf0404",
    fontFamily: "ZenLight",
    fontSize: 20,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
  },
  topView: {
    height: height * 0.3,
    justifyContent: "space-evenly",
  },
  bottomView: {
    height: height * 0.3,
    justifyContent: "space-evenly",
  },
  viewWifiSettings: {
    marginLeft: 10,
  },
  fullWidth: {
    width,
    alignItems: "flex-end",
    marginRight: 50,
  },
});
