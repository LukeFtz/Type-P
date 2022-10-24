import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import { Dimensions, Modal, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { currentTemperature } from "../../src/reducers/reducer";
import { cancelHeat, getTemp } from "../../utilities/controler";
// import { getTemp } from "../../utilities/functions";
import { communication, InScreen } from "../../utilities/types";

const { height, width } = Dimensions.get("screen");

const HeatInfo: React.FC<InScreen> = ({ apperInScreen }) => {
  const currentTemp = useSelector(currentTemperature);
  const [tempDef, setTempDef] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);
  const opacity = useSharedValue<number>(1);

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

  const getTemps = async () => {
    const auxTemp = await getTemp();
    setTempDef(auxTemp);
  };

  useEffect(() => {
    getTemps();
  }, []);

  const cancelProcess = () => {
    // cancelCurrentProcess();
    cancelHeat();
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
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
      <Animated.View style={[styles.viewMainConten, animatedStyles]}>
        <View style={styles.centerObj}>
          <Text style={styles.txtLabel}>Temperatura Atual</Text>
          <Text style={styles.txtCurrentTemp}>{currentTemp}°</Text>
          <View style={styles.viewTempDef}>
            <Text style={styles.txtLabel}>Temperatura Definida </Text>
            <Text style={styles.txtTempDef}> {tempDef}°</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.btnCancel}>
              <Text style={styles.txtBtnCancel}>Cancelar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animated.View>
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
