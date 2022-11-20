import React, { useEffect, useState } from "react";
import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import { InScreen } from "../../utilities/types";
import {
  cancelRecycle,
  getTime,
  getTimeInSeconds,
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
import { useSelector } from "react-redux";
import { currentTemperature } from "../../src/reducers/reducer";
import { currentRecycleTime } from "../../src/reducers/utilities";

// import { Container } from './styles';
const { width } = Dimensions.get("screen");

const RecicleInfo: React.FC<InScreen> = ({ apperInScreen }) => {
  const [timeDef, setTimeDef] = useState<string>("");
  const [timeSec, setTimeSec] = useState<number | null>();
  // const [currentTemp, setCurrentTemp] = useState<number | string>(100);
  const currentTime = useSelector(currentRecycleTime);
  const currentTemp = useSelector(currentTemperature);
  const [modalVisible, setModalVisible] = useState(false);
  const opacity = useSharedValue<number>(1);

  const getTimeDef = async () => {
    const auxTimeSeconds = await getTimeInSeconds();
    setTimeSec(auxTimeSeconds);
    console.log(auxTimeSeconds);
    const aux: string = await getTime();
    setTimeDef(aux);
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
    getTimeDef();
  }, []);

  const cancelProcess = () => {
    cancelRecycle();
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
          <Text style={styles.txtLabelBold}> {timeDef}:00</Text>
        </View>
        <View style={styles.viewText}>
          <Text style={styles.txtLabel}>Tempo Atual </Text>
          <Text style={styles.txtLabelBoldGreen}> {currentTime}</Text>
        </View>
      </View>
      <View style={styles.centerialize}>
        {timeSec && <RecycleProcess timeDefined={timeSec} />}
      </View>
      <View style={styles.centerialize}>
        <Text style={styles.txtLabelTemp}>{currentTemp}°</Text>
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
