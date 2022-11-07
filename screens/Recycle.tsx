import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "../utilities/types";
import Logo from "../components/geral/Logo";
import BtnRecycle from "../components/pages/BtnRecycle";
import RecycleInfo from "../components/pages/RecycleInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  heatFinished,
  isRecycleCanceled,
  isRecycleFinished,
  isRecycleStarted,
} from "../src/reducers/reducer";
import { connectAppToFirebase, setDefaultValues } from "../utilities/controler";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import store from "../src/storage";

type screenNavigationProp = StackScreenProps<RootStackParamList, "Recycle">;

const Recycle: React.FC<screenNavigationProp> = ({ navigation }) => {
  const [showBtn, setShowBtn] = useState<boolean>(true);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [btnOnScreen, setBtnOnScreen] = useState<boolean>(true);
  const [infoOnScreen, setInfoOnScreen] = useState<boolean>(false);

  const recycle = useSelector(isRecycleStarted);
  const recycleFinished = useSelector(isRecycleFinished);
  const recycleCanceled = useSelector(isRecycleCanceled);

  // const getConnections = async () => {
  //   let auxApp = await connectAppToFirebase();
  //   while (!auxApp) {
  //     auxApp = await connectAppToFirebase();
  //   }
  // };

  const Header = (_navigation: { goBack: () => void }) => (
    <View style={styles.containerHeader}>
      <TouchableOpacity
        onPress={() => {
          store.dispatch(heatFinished(false));
          _navigation.goBack();
        }}
      >
        <LinearGradient
          colors={["#C34242", "#fff"]}
          style={styles.btnBorderView}
          start={[0, 1]}
          end={[1, 1]}
        >
          <LinearGradient
            colors={["#E39B9B", "#fff"]}
            style={styles.btnView}
            start={[0, 1]}
            end={[1, 1]}
          >
            {/* <Text style={styles.txtBtn}>RECICLAR</Text> */}
          </LinearGradient>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const customHeader = () => {
    navigation.setOptions({
      headerShown: !showInfo,
      header: ({ navigation }) => <Header {...navigation} />,
    });
  };

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
      // getConnections();
      setDefaultValues();
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
        setDefaultValues();
      }, 500);
    }
  }, [recycleCanceled]);

  useEffect(() => {
    customHeader();
  }, []);

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
  containerHeader: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  btnView: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  btnBorderView: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
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
