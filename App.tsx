import React from "react";
import "react-native-gesture-handler";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import Type from "./screens/Type";
import Configuration from "./screens/Configuration";
import WifiConfigurations from "./screens/WifiConfigurations";
import SelectWifi from "./screens/SelectWifi";
import StabilizingCommunication from "./screens/StabilizingCommunication";
import Heat from "./screens/Heat";
import Recycle from "./screens/Recycle";
import FinishedScreen from "./screens/FinishedScreen";
import { RootStackParamList } from "./utilities/types";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { Provider } from "react-redux";
import store from "./src/storage";

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

const Header = (navigation: { goBack: () => void }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
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

const StackNavigator = () => {
  return (
    <Navigator initialRouteName="Home">
      <Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="Type"
        component={Type}
        options={{
          header: ({ navigation }) => <Header {...navigation} />,
        }}
      />
      <Screen
        name="Configuration"
        component={Configuration}
        options={{
          header: ({ navigation }) => <Header {...navigation} />,
        }}
      />
      <Screen
        name="WifiConfigurations"
        component={WifiConfigurations}
        options={{
          header: ({ navigation }) => <Header {...navigation} />,
        }}
      />
      <Screen
        name="SelectWifi"
        component={SelectWifi}
        options={{
          header: ({ navigation }) => <Header {...navigation} />,
        }}
      />
      <Screen
        name="StabilizingCommunication"
        component={StabilizingCommunication}
        options={{
          header: ({ navigation }) => <Header {...navigation} />,
        }}
      />
      <Screen
        name="Heat"
        component={Heat}
        options={{
          header: ({ navigation }) => <Header {...navigation} />,
        }}
      />
      <Screen
        name="Recycle"
        component={Recycle}
        options={{
          header: ({ navigation }) => <Header {...navigation} />,
        }}
      />
      <Screen
        name="FinishedScreen"
        component={FinishedScreen}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
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
});
