import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
// import { connectToRedisServer } from "../../utilities/controler";
import { navigationPropsConfigOven } from "../../utilities/types";

// import { io } from "socket.io-client";
// import TcpSocket from "react-native-tcp-socket";

const ConfigOven: React.FC<navigationPropsConfigOven> = ({ navigation }) => {
  // const socket = io("ws://192.168.0.113:8000/ws/redis/");
  const websocket = new WebSocket("ws://192.168.0.113:8000/ws/redis/");

  const goToNextPage = () => {
    // if (goTo === "CONFIGIGURATION") {
    //   navigation.navigate("Configuration");
    // }
    // if (goTo==="COFIGURAR_FORNO"){
    //   navigation.navigate("OvenConfiguration");
    // }
    // connectToRedisServer();
  };

  useEffect(() => {
    websocket.addEventListener("message", (e) => {
      console.log(e);
    });
    // websocket.onclose = (e) => {
    //   // 連接被關閉了
    //   console.log("onclose", e.code, e.reason);
    // };
    // const options = {
    //   port: 8000,
    //   host: "127.0.0.1",
    //   localAddress: "127.0.0.1",
    //   reuseAddress: true,
    //   // localPort: 20000,
    //   // interface: "wifi",
    // };
    // // Create socket
    // const client = TcpSocket.createConnection(options, () => {
    //   // Write on the socket
    //   client.write("Hello server!");
    //   // Close socket
    //   client.destroy();
    // });
    // client.on("data", function (data) {
    //   console.log("message was received", data);
    // });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.txtBtn}>Configurar Forno</Text>
      <TouchableOpacity onPress={goToNextPage}>
        <LinearGradient
          colors={["#42C3A1", "#fff"]}
          style={styles.btnBorderView}
          start={[1, 1]}
          end={[0, 1]}
        >
          <LinearGradient
            colors={["#CBEED5", "#fff"]}
            style={styles.btnView}
            start={[1, 1]}
            end={[0, 1]}
          ></LinearGradient>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ConfigOven;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnView: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  btnBorderView: {
    width: 105,
    height: 105,
    borderRadius: 105 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  txtBtn: {
    fontFamily: "ZenLight",
    fontSize: 20,
    marginRight: 10,
  },
});
