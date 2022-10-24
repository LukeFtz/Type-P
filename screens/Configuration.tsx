import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Forward from "../components/geral/Forward";
import Edit from "../components/icons/Edit";
import Verified from "../components/icons/Verified";
import { RootStackParamList, valuesNumbers } from "../utilities/types";
import { Picker } from "@react-native-picker/picker";
import { getValues } from "../utilities/values";
import { defineValue } from "../utilities/controler";

type screenNavigationProp = StackScreenProps<
  RootStackParamList,
  "Configuration"
>;

const { width } = Dimensions.get("screen");
const NUMBERS = getValues();

const Configuration: React.FC<screenNavigationProp> = (navigationProps) => {
  const [tempo, setTempo] = useState<string>("00:01");
  const [temperatura, setTemperatura] = useState<number>(40);
  const [quantidade, setQuantidade] = useState<number>(10);

  const [uniQnt, setUniQnt] = useState<number>(0);
  const [decQnt, setDecQnt] = useState<number>(0);
  const [cenQnt, setCenQnt] = useState<number>(0);

  useEffect(() => {
    const auxQnt: valuesNumbers = {
      cen: cenQnt + "",
      dec: decQnt + "",
      uni: uniQnt + "",
    };
    // const auxFinalQnt = defineValue(auxQnt);
    setQuantidade(10);
  }, [cenQnt, decQnt, uniQnt]);

  return (
    <View style={[styles.container, styles.spacingItems]}>
      <Text style={styles.textTitle}>Configurações Gerais</Text>
      <View style={styles.itemQnt}>
        <View style={[styles.defineRow]}>
          <View style={[styles.defineRow, styles.defineCenterRow]}>
            <View style={styles.iconVerified}>
              <Verified />
            </View>
            <View style={[styles.defineRow, styles.defineQntRow]}>
              <Text style={styles.txtMainQnt}>{quantidade}</Text>
              <Text style={styles.txtMainQntG}>g</Text>
              <TouchableOpacity style={styles.btnEdit}>
                <Edit />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <View style={styles.defineRow}>
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
        </View> */}
        <Text style={styles.textTitle}>Quantidade</Text>
      </View>
      <View style={[styles.defineRow, styles.itemsRowSpacing]}>
        <View style={styles.itemQnt}>
          <Text style={styles.txtBottomItems}>{tempo}</Text>
          <Text style={styles.textTitle}>Tempo</Text>
        </View>

        <View style={styles.lineSeparator} />

        <View style={styles.itemQnt}>
          <View style={[styles.defineRow, styles.defineTempRow]}>
            <Text style={styles.txtBottomItems}>{temperatura}</Text>
            <Text style={styles.txtTemp}>°C</Text>
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
  defineQntRow: {
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
});
