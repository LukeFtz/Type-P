import React, { useEffect, useState } from "react";
import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import { communication, InScreen } from "../../utilities/types";
import {
  cancelCurrentProcess,
  getTime,
  getWebSocket,
} from "../../utilities/controler";
import RecycleProcess from "../custom/RecycleProcess";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// import { Container } from './styles';
const { width } = Dimensions.get("screen");
let websocket: WebSocket;

const RecicleInfo: React.FC<InScreen> = ({ apperInScreen }) => {
  const [timeDef, setTimeDef] = useState<string>("");
  const [currentTemp, setCurrentTemp] = useState<number | string>(100);
  let temporaryIndex = true;
  const [modalVisible, setModalVisible] = useState(false);
  const opacity = useSharedValue<number>(1);

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

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    };
  });

  useEffect(() => {
    if (!apperInScreen) {
      opacity.value = 0;
    } else {
      opacity.value = 1;
    }
  }, [apperInScreen]);

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

  const cancelProcess = () => {
    cancelCurrentProcess();
    setModalVisible(!modalVisible);
  };

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
          <View style={styles.viewModalContent}>
            <Text style={styles.txtModalBold}>
              Interromper o processo agora pode afetar o processo de reciclagem!
            </Text>
            <Text style={styles.txtModalQuest}>
              Realmente deseja continuar?
            </Text>
            <View style={styles.rowDirection}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <View style={styles.btnModalNo}>
                  <Text style={styles.txtBtnModal}>Não</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => cancelProcess()}>
                <View style={styles.btnModalYes}>
                  <Text style={styles.txtBtnModal}>Sim</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
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
        <Text style={styles.txtLabelTemp} onPress={temporaryFunc}>
          {currentTemp}°
        </Text>
      </View>
      <View style={styles.viewBtnCancel}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.btnCancel}>
            <Text style={styles.txtBtnCancel}>Cancelar</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* </View> */}
    </Animated.View>
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
  blurContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  viewModalContent: {
    width: width * 0.9,
    // height: height * 0.25,
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  txtModalBold: {
    color: "#000",
    fontFamily: "ZenBold",
    fontSize: 20,
    textAlign: "center",
  },
  rowDirection: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  txtModalQuest: {
    paddingTop: 10,
    paddingBottom: 10,
    color: "#000",
    fontSize: 20,
    fontFamily: "ZenLight",
    textAlign: "center",
  },
  btnModalNo: {
    backgroundColor: "#17AE86",
  },
  btnModalYes: {
    backgroundColor: "#AE1717",
  },
  txtBtnModal: {
    color: "#fff",
    fontFamily: "ZenLight",
    fontSize: 20,
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
});
