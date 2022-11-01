import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import Logo from "../components/geral/Logo";
import {
  connectAppToFirebase,
  resetOvenConfiguration,
} from "../utilities/controler";
// import { VerifyDataUpdate } from "../utilities/reduxFunctions";
import { RootStackParamList } from "../utilities/types";
import Finished from "../components/icons/Finished";
import ConfigOven from "../components/custom/ConfigOven";
import { useSelector } from "react-redux";
import {
  ovenConnectedStatus,
  selectConfigurated,
} from "../src/reducers/reducer";
import { useNetInfo } from "@react-native-community/netinfo";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
const { width, height } = Dimensions.get("screen");

type screenNavigationProp = StackScreenProps<
  RootStackParamList,
  "StabilizingCommunication"
>;

const StabilizingCommunication: React.FC<screenNavigationProp> = ({
  route,
  navigation,
}) => {
  // const [ovenConnected, setOvenConnected] = useState<boolean>(false);
  const ovenConnected = useSelector(ovenConnectedStatus);
  const [appConnected, setAppConnected] = useState<boolean>(false);
  const [communicationStabilished, setCommunicationStabilished] =
    useState<boolean>(false);
  const netInfo = useNetInfo();

  const ovenConfigurated = useSelector(selectConfigurated);

  const Header = (_navigation: { goBack: () => void }) => (
    <View style={styles.containerHeader}>
      <TouchableOpacity
        onPress={() => {
          if (ovenConfigurated) {
            resetOvenConfiguration();
            _navigation.goBack();
          } else {
            _navigation.goBack();
          }
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
      header: ({ navigation }) => <Header {...navigation} />,
    });
  };

  const getConnections = async () => {
    const auxApp = await connectAppToFirebase();
    setAppConnected(auxApp);
    // const auxOven = await verifyOvenConnection();
    // setOvenConnected(auxOven);
    // console.log(auxOven);
  };

  useEffect(() => {
    if (ovenConfigurated) {
      navigation.navigate("Heat");
    }
  }, [ovenConfigurated]);

  useEffect(() => {
    if (ovenConnected && appConnected) {
      setCommunicationStabilished(true);
    }
  }, [ovenConnected, appConnected]);

  useEffect(() => {
    // if (netInfo.isInternetReachable) {
    // }
    getConnections();
  }, [netInfo]);

  useEffect(() => {
    customHeader();
    getConnections();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.topView}>
        {!communicationStabilished && (
          <View style={styles.textCenter}>
            <View style={styles.row}>
              <Text style={styles.textLabelApproved}>Conectado a </Text>
              <Text style={styles.txtLabelBold}>{route.params.ssid}</Text>
            </View>
            <Text style={styles.textLabel}>Estabelecendo comunicação</Text>
          </View>
        )}
        <View style={styles.viewLogo}>
          <Logo />
        </View>
        {!communicationStabilished ? (
          <Text style={styles.textLabel}>Aguarde um instante</Text>
        ) : (
          <View style={[styles.row, styles.centerized]}>
            <View style={styles.iconSize}>
              <Finished />
            </View>
            <Text style={styles.textLabel}> Tudo Pronto</Text>
          </View>
        )}
      </View>
      {communicationStabilished && (
        <View style={styles.bottomView}>
          <ConfigOven />
        </View>
      )}
    </View>
  );
};

export default StabilizingCommunication;

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
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textLabel: {
    fontFamily: "ZenLight",
    fontSize: 20,
    color: "#000",
    textAlign: "center",
  },
  textLabelApproved: {
    fontFamily: "ZenLight",
    fontSize: 16,
    color: "#000",
  },
  textCenter: {
    alignItems: "center",
  },
  txtLabelBold: {
    color: "#000",
    fontFamily: "ZenBold",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
  },
  centerized: {
    justifyContent: "center",
    alignItems: "center",
  },
  topView: {
    height: height * 0.55,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  bottomView: {
    width: width * 0.9,
    height: height * 0.3,
    alignItems: "flex-end",
    // justifyContent: "space-evenly",
  },
  viewLogo: {
    width: 150,
    height: 160,
  },
  iconSize: {
    width: 50,
    height: 50,
  },
});
