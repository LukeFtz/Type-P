import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../utilities/types";
import Logo from "../components/geral/Logo";
import BtnRecycle from "../components/pages/BtnRecycle";
import RecycleInfo from "../components/pages/RecycleInfo";
import { useSelector } from "react-redux";
import {
  isRecycleCanceled,
  isRecycleFinished,
  isRecycleStarted,
} from "../src/reducers/reducer";

type screenNavigationProp = StackScreenProps<RootStackParamList, "Recycle">;

const Recycle: React.FC<screenNavigationProp> = ({ navigation }) => {
  const [showBtn, setShowBtn] = useState<boolean>(true);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [btnOnScreen, setBtnOnScreen] = useState<boolean>(true);
  const [infoOnScreen, setInfoOnScreen] = useState<boolean>(false);

  const recycle = useSelector(isRecycleStarted);
  const recycleFinished = useSelector(isRecycleFinished);
  const recycleCanceled = useSelector(isRecycleCanceled);

  useEffect(() => {
    if (recycle) {
      setShowBtn(false);
      setInfoOnScreen(true);
      setTimeout(() => {
        setShowInfo(true);
        setBtnOnScreen(false);
      }, 500);
    }
  }, [recycle]);

  useEffect(() => {
    if (recycleFinished) {
      navigation.navigate("FinishedScreen");
    }
  }, [recycleFinished]);

  useEffect(() => {
    if (recycleCanceled) {
      setInfoOnScreen(false);
      setBtnOnScreen(true);
      setTimeout(() => {
        setShowBtn(true);
        setShowInfo(false);
      }, 500);
    }
  }, [recycleCanceled]);

  return (
    <View style={styles.container}>
      <View style={styles.upperContend}>
        {btnOnScreen && <BtnRecycle apperInScreen={showBtn} />}
        {infoOnScreen && <RecycleInfo apperInScreen={showInfo} />}
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
