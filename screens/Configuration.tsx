import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, Modal } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Forward from "../components/geral/Forward";
import Edit from "../components/icons/Edit";
import Verified from "../components/icons/Verified";
import {
  modalPickerTypes,
  RootStackParamList,
  valuesNumbers,
} from "../utilities/types";
import { Picker } from "@react-native-picker/picker";
import { getValues } from "../utilities/values";
import { defineValue } from "../utilities/controler";
import { BlurView } from "expo-blur";

type screenNavigationProp = StackScreenProps<
  RootStackParamList,
  "Configuration"
>;

const { width } = Dimensions.get("screen");
const NUMBERS = getValues();

const Configuration: React.FC<screenNavigationProp> = (navigationProps) => {
  const [tempo, setTempo] = useState<string>("00:05");
  const [temperatura, setTemperatura] = useState<number>(120);
  const [quantidade, setQuantidade] = useState<number>(100);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPicker, setSelectedPicker] = useState<modalPickerTypes>({
    type: "WEIGHT",
  });

  const [uniQnt, setUniQnt] = useState<number>(0);
  const [decQnt, setDecQnt] = useState<number>(0);
  const [cenQnt, setCenQnt] = useState<number>(0);

  const [hour, setHour] = useState<number>(0);
  const [decMin, setDecMin] = useState<number>(0);
  const [uniMin, setUniMin] = useState<number>(0);

  const [uniTemp, setUniTemp] = useState<number>(0);
  const [decTemp, setDecTemp] = useState<number>(0);
  const [cenTemp, setCenTemp] = useState<number>(0);

  // useEffect(() => {
  //   const auxQnt: valuesNumbers = {
  //     cen: cenQnt + "",
  //     dec: decQnt + "",
  //     uni: uniQnt + "",
  //   };
  //   const auxFinalQnt = defineValue(auxQnt);
  //   setQuantidade(auxFinalQnt);
  // }, [cenQnt, decQnt, uniQnt]);

  const ModalContent = () => {
    const { type } = selectedPicker;
    if (type === "WEIGHT") {
      return (
        <View style={[styles.defineRow, styles.centerModalConted]}>
          <Picker
            selectedValue={cenQnt}
            onValueChange={(itemValue) => setCenQnt(itemValue)}
            style={{ width: 100, height: 200 }}
          >
            {NUMBERS.map((item, index) => (
              <Picker.Item key={index} label={item + ""} value={item} />
            ))}
          </Picker>

          <Picker
            selectedValue={decQnt}
            onValueChange={(itemValue) => setDecQnt(itemValue)}
            style={{ width: 100, height: 200 }}
          >
            {NUMBERS.map((item, index) => (
              <Picker.Item key={index} label={item + ""} value={item} />
            ))}
          </Picker>
          <Picker
            selectedValue={uniQnt}
            onValueChange={(itemValue) => setUniQnt(itemValue)}
            style={{ width: 100, height: 200 }}
          >
            {NUMBERS.map((item, index) => (
              <Picker.Item key={index} label={item + ""} value={item} />
            ))}
          </Picker>
        </View>
      );
    }

    if (type === "TIME") {
      return (
        <View style={[styles.defineRow, styles.centerModalConted]}>
          <Picker
            selectedValue={hour}
            onValueChange={(itemValue) => setHour(itemValue)}
            style={{ width: 100, height: 200 }}
          >
            {NUMBERS.map((item, index) => (
              <Picker.Item key={index} label={item + ""} value={item} />
            ))}
          </Picker>
          <Text style={styles.timeSeparator}>:</Text>
          <Picker
            selectedValue={decMin}
            onValueChange={(itemValue) => setDecMin(itemValue)}
            style={{ width: 100, height: 200 }}
          >
            {NUMBERS.map((item, index) => (
              <Picker.Item key={index} label={item + ""} value={item} />
            ))}
          </Picker>
          <Picker
            selectedValue={uniMin}
            onValueChange={(itemValue) => setUniMin(itemValue)}
            style={{ width: 100, height: 200 }}
          >
            {NUMBERS.map((item, index) => (
              <Picker.Item key={index} label={item + ""} value={item} />
            ))}
          </Picker>
        </View>
      );
    }

    return (
      <View style={[styles.defineRow, styles.centerModalConted]}>
        <Picker
          selectedValue={cenTemp}
          onValueChange={(itemValue) => setCenTemp(itemValue)}
          style={{ width: 100, height: 200 }}
        >
          {NUMBERS.map((item, index) => {
            if (item <= 3 && item >= 1) {
              return <Picker.Item key={index} label={item + ""} value={item} />;
            }
          })}
        </Picker>

        <Picker
          selectedValue={decTemp}
          onValueChange={(itemValue) => setDecTemp(itemValue)}
          style={{ width: 100, height: 200 }}
        >
          {NUMBERS.map((item, index) => (
            <Picker.Item key={index} label={item + ""} value={item} />
          ))}
        </Picker>
        <Picker
          selectedValue={uniTemp}
          onValueChange={(itemValue) => setUniTemp(itemValue)}
          style={{ width: 100, height: 200 }}
        >
          {NUMBERS.map((item, index) => (
            <Picker.Item key={index} label={item + ""} value={item} />
          ))}
        </Picker>
      </View>
    );
  };

  const defineModalContent = (type: modalPickerTypes) => {
    setSelectedPicker(type);
    setModalVisible(!modalVisible);
  };

  const confirmModalValues = () => {
    const { type } = selectedPicker;
    if (type === "WEIGHT") {
      const auxQnt: valuesNumbers = {
        cen: cenQnt + "",
        dec: decQnt + "",
        uni: uniQnt + "",
      };
      const auxFinalQnt = defineValue(auxQnt);
      setQuantidade(auxFinalQnt);
    } else if (type === "TIME") {
      const auxTime = "0" + hour + ":" + decMin + uniMin;
      setTempo(auxTime);
    } else {
      const auxTemp: valuesNumbers = {
        cen: cenTemp + "",
        dec: decTemp + "",
        uni: uniTemp + "",
      };
      const auxFinalTemp = defineValue(auxTemp);
      setTemperatura(auxFinalTemp);
    }
    setModalVisible(!modalVisible);
  };

  return (
    <View style={[styles.container, styles.spacingItems]}>
      <Text style={styles.textTitle}>Configurações Gerais</Text>
      <View style={styles.itemQnt}>
        <View style={[styles.defineRow]}>
          <View style={[styles.defineRow, styles.defineCenterRow]}>
            <View style={styles.iconVerified}>
              <Verified />
            </View>
            <View style={[styles.defineRow, styles.defineRowBottom]}>
              <Text style={styles.txtMainQnt}>{quantidade}</Text>
              <Text style={styles.txtMainQntG}>g</Text>
              <TouchableOpacity
                style={styles.btnEdit}
                onPress={() => defineModalContent({ type: "WEIGHT" })}
              >
                <Edit />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Text style={styles.textTitle}>Quantidade</Text>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <BlurView intensity={30} tint="dark" style={styles.blurContainer}>
            <View style={styles.viewExit}>
              <TouchableOpacity
                style={styles.btnExit}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textLabelWhite}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.viewModalContent}>
              <ModalContent />
            </View>
            <View>
              <TouchableOpacity
                style={styles.btnDefine}
                onPress={() => confirmModalValues()}
              >
                <Text style={styles.textLabelWhite}>Definir</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>
      </View>
      <View style={[styles.defineRow, styles.itemsRowSpacing]}>
        <View style={styles.itemQnt}>
          <View style={[styles.defineRow, styles.defineRowBottom]}>
            <Text style={styles.txtBottomItems}>{tempo}</Text>
            <TouchableOpacity
              style={styles.btnEditBottom}
              onPress={() => defineModalContent({ type: "TIME" })}
            >
              <Edit />
            </TouchableOpacity>
          </View>
          <Text style={styles.textTitle}>Tempo</Text>
        </View>

        <View style={styles.lineSeparator} />

        <View style={styles.itemQnt}>
          <View style={[styles.defineRow, styles.defineRowBottom]}>
            <View style={[styles.defineRow, styles.defineTempRow]}>
              <Text style={styles.txtBottomItems}>{temperatura}</Text>
              <Text style={styles.txtTemp}>°C</Text>
            </View>
            <TouchableOpacity
              style={styles.btnEditBottom}
              onPress={() => defineModalContent({ type: "TEMPERATURE" })}
            >
              <Edit />
            </TouchableOpacity>
          </View>
          <Text style={styles.textTitle}>Temperatura</Text>
        </View>
      </View>
      <View style={styles.fullWidth}>
        <Forward
          goTo="CONFIGURATE_WIFI"
          temperatura={temperatura}
          tempo={tempo}
          {...navigationProps}
        />
      </View>
    </View>
  );
};

export default Configuration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  spacingItems: {
    justifyContent: "space-evenly",
  },
  textTitle: {
    fontFamily: "ZenLight",
    fontSize: 20,
    color: "#000",
  },
  itemQnt: {
    alignItems: "center",
  },
  defineRowBottom: {
    alignItems: "flex-end",
  },
  defineTempRow: {
    alignItems: "flex-start",
  },
  defineCenterRow: {
    alignItems: "center",
  },
  iconVerified: {
    marginRight: 10,
  },
  defineRow: {
    flexDirection: "row",
  },
  centerModalConted: {
    alignItems: "center",
    justifyContent: "center",
  },
  txtMainQnt: {
    fontFamily: "ZenLight",
    fontSize: 80,
  },
  txtMainQntG: {
    fontFamily: "ZenLight",
    fontSize: 40,
    marginBottom: 15,
  },
  txtTemp: {
    fontFamily: "ZenLight",
    fontSize: 10,
    marginTop: 20,
  },
  txtBottomItems: {
    fontFamily: "ZenLight",
    fontSize: 50,
  },
  timeSeparator: {
    fontFamily: "ZenLight",
    fontSize: 39,
    color: "gray",
  },
  lineSeparator: {
    width: 1,
    height: 98,
    backgroundColor: "#7D7D7D",
  },
  itemsRowSpacing: {
    width: width / 1.2,
    justifyContent: "space-around",
  },
  fullWidth: {
    width,
    alignItems: "flex-end",
    marginRight: 50,
  },
  btnEdit: {
    marginBottom: 15,
    marginLeft: 15,
  },
  btnEditBottom: {
    marginBottom: 15,
    // marginLeft: 15,
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
    // padding: ,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
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
  btnDefine: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.9,
    padding: 10,
    backgroundColor: "#279C7D",
  },
  textLabelWhite: {
    fontFamily: "ZenLight",
    fontSize: 15,
    color: "#fff",
  },
});
