import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../utilities/types";
import Logo from "../components/geral/Logo";
import BtnHeat from "../components/custom/BtnHeat";
import HeatInfo from "../components/pages/HeatInfo";
import { useSelector } from "react-redux";
import {
  heatingStatus,
  isHeatCanceled,
  isHeatFinished,
} from "../src/reducers/reducer";
import { setDefaultValues } from "../utilities/controler";

type screenNavigationProp = StackScreenProps<RootStackParamList, "Heat">;

const Heat: React.FC<screenNavigationProp> = ({ navigation }) => {
  const [showBtn, setShowBtn] = useState<boolean>(true);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [btnOnScreen, setBtnOnScreen] = useState<boolean>(true);
  const [infoOnScreen, setInfoOnScreen] = useState<boolean>(false);

  const heating = useSelector(heatingStatus);
  const heatingFinished = useSelector(isHeatFinished);
  const heatCanceled = useSelector(isHeatCanceled);

  const customHeader = () => {
    navigation.setOptions({
      headerShown: !showInfo,
    });
  };

  useEffect(() => {
    if (heating) {
      setShowBtn(false);
      setInfoOnScreen(true);
      setTimeout(() => {
        setShowInfo(true);
        setBtnOnScreen(false);
      }, 500);
    }
  }, [heating]);

  useEffect(() => {
    if (heatingFinished) {
      navigation.navigate("Recycle");
    } else {
      setShowBtn(true);
      setShowInfo(false);
      setBtnOnScreen(true);
      setInfoOnScreen(false);
    }
  }, [heatingFinished]);

  useEffect(() => {
    if (heatCanceled) {
      setInfoOnScreen(false);
      setBtnOnScreen(true);
      setTimeout(() => {
        setShowBtn(true);
        setShowInfo(false);
        setDefaultValues();
      }, 500);
    }
  }, [heatCanceled]);

  useEffect(() => {
    customHeader();
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
