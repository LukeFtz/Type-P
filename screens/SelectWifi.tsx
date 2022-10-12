import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ListRenderItem,
  FlatList,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Logo from "../components/geral/Logo";
import Wifi from "../components/icons/Wifi";
import { wifiData } from "../utilities/types";
import { OVEN_SERVER } from "../utilities/values";

const { width, height } = Dimensions.get("screen");

// const wifiAPs: wifiData[] = [
//   { ssid: "CLARO_2GA6136C", strength: -84, security: true },
//   { ssid: "FERNANDES_2.4", strength: -83, security: true },
//   { ssid: "MATHEUS20_2G", strength: -90, security: true },
//   { ssid: "Cakemel 2G", strength: -81, security: true },
//   { ssid: "Elson", strength: -84, security: true },
//   { ssid: "DANISE", strength: -89, security: true },
//   { ssid: "CLARO_2GBCDE4F", strength: -85, security: true },
//   { ssid: "NETcasa05", strength: -89, security: true },
//   { ssid: "#NET-CLARO-WIFI", strength: -89, security: true },
//   { ssid: "#NET-CLARO-WIFI", strength: -85, security: true },
//   { ssid: "PRISSMA_FIBRA_2D90", strength: -55, security: true },
//   { ssid: "Angel Mix Servico Social", strength: -70, security: true },
// ];

const SelectWifi: React.FC = () => {
  const [selectedWifi, setSelectedWifi] = useState<wifiData | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [firstPass, setfirstPass] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");
  const [wifiAPs, setWifiAPs] = useState<wifiData[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const [text, setText] = useState<string>("a");

  const putWifiCredentials = (item: wifiData) => {
    setSelectedWifi(item);
    setShowModal(true);
  };

  const connectToWifi = () => {
    const postContent = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    fetch(
      OVEN_SERVER +
        "/login?ssid=" +
        selectedWifi?.ssid +
        "&password=" +
        password,
      postContent
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.connected === true) {
          setConnected(true);
        } else {
          setText("Nao conectado");
        }
      })
      .catch((e) => {
        setText("Algo deu errado");
      });
  };

  const getLocalAPs = () => {
    fetch(OVEN_SERVER + "/scan")
      .then((response) => response.json())
      .then((json: wifiData[]) => {
        setWifiAPs(json);
      })
      .catch((e) => {
        setfirstPass(false);
        setWifiAPs([]);
      });
  };

  const renderItemWifi: ListRenderItem<wifiData> = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => putWifiCredentials(item)}>
        <View
          style={[
            styles.viewItems,
            styles.viewItemWidth,
            { borderTopWidth: index === 0 ? 0 : 1 },
          ]}
        >
          <View style={styles.centerView}>
            <Text style={styles.textLabel}>{item.ssid}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
      >
        <KeyboardAvoidingView
          behavior={"padding"}
          style={styles.modalContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
              <View style={styles.viewExit}>
                <TouchableOpacity
                  style={styles.btnExit}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.textLabelWhite}>X</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.viewModalContent}>
                <Text style={styles.txtLabelBold}>{selectedWifi?.ssid}</Text>
                <View style={styles.row}>
                  <Text style={styles.textLabel}>Senha:</Text>
                  <TextInput
                    secureTextEntry={true}
                    style={styles.textInput}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                  />
                </View>
                <TouchableOpacity
                  style={styles.btnScanWifi}
                  onPress={() => connectToWifi()}
                >
                  <Text style={styles.textLabelWhite}>Connectar</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
      <View style={styles.topView}>
        <Text style={[styles.textLabel, styles.textTitle]}>
          Selecione a rede o qual o forno deve se conectar
        </Text>
        <View style={[styles.row, styles.viewTopperContent]}>
          <Wifi />
          <View style={styles.viewScanWifi}>
            <TouchableOpacity
              style={styles.btnScanWifi}
              onPress={() => getLocalAPs()}
            >
              <Text style={styles.textLabelWhite}>Scanear Redes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {connected && <Text>Connected</Text>}
      <Text>{text}</Text>
      <View style={styles.bottomView}>
        <FlatList
          data={wifiAPs}
          renderItem={renderItemWifi}
          keyExtractor={(_, index) => index + ""}
        />
        {wifiAPs.length === 0 && !firstPass && (
          <Text style={styles.textLabel}>Nenhuma rede encontrada</Text>
        )}
      </View>
      <View style={{ width: 100, height: 110 }}>
        <Logo />
      </View>
    </View>
  );
};

export default SelectWifi;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modalContainer: {
    flex: 1,
  },
  textTitle: {
    textAlign: "center",
    padding: 30,
  },
  textLabel: {
    fontFamily: "ZenLight",
    fontSize: 20,
    color: "#000",
  },
  textLabelWhite: {
    fontFamily: "ZenLight",
    fontSize: 15,
    color: "#fff",
  },
  txtLabelBold: {
    color: "#000",
    fontSize: 18,
    fontFamily: "ZenBold",
    textAlign: "center",
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
    alignItems: "center",
  },
  viewScanWifi: {
    marginLeft: 10,
  },
  btnScanWifi: {
    width: 156,
    height: 48,
    backgroundColor: "#498F7C",
    justifyContent: "center",
    alignItems: "center",
  },
  viewTopperContent: {
    width: width * 0.7,
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomView: {
    height: height * 0.43,
    width: width * 0.7,
    justifyContent: "space-evenly",
  },
  centerView: {
    justifyContent: "center",
    alignItems: "center",
  },
  viewItemWidth: {
    width: width * 0.68,
  },
  viewItems: {
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: "#BEBEBE",
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  viewBoders: {
    height: height * 0.45,
  },
  viewModalContent: {
    width: width * 0.9,
    height: height * 0.25,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  textInput: {
    width: width * 0.6,
    height: 45,
    borderRadius: 45 / 2,
    backgroundColor: "#E9E9E9",
    paddingHorizontal: 10,
    fontFamily: "ZenBold",
    fontSize: 20,
  },
  viewExit: {
    width: width * 0.9,
    flexDirection: "row-reverse",
  },
  btnExit: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    backgroundColor: "#e00909",
  },
});
