import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Forward from "../components/geral/Forward";
import { RootStackParamList } from "../utilities/types";

type screenNavigationProp = StackScreenProps<RootStackParamList, "Configuration">;

const { width } = Dimensions.get("screen");

const Configuration: React.FC<screenNavigationProp> = (navigationProps) => {
  return (
    <View style={[styles.container, styles.spacingItems]}>
      <Text style={styles.textTitle}>Configurações Gerais</Text>
      <View style={styles.itemQnt}>
        <View style={[styles.defineRow, styles.defineQntRow]}>
          <Text style={styles.txtMainQnt}>10</Text>
          <Text style={styles.txtMainQntG}>g</Text>
        </View >
        <Text style={styles.textTitle}>Quantidade</Text>
      </View>
      <View style={[styles.defineRow, styles.itemsRowSpacing]}>
          <View style={styles.itemQnt}>
            <Text style={styles.txtBottomItems}>00:00</Text>
            <Text style={styles.textTitle}>Tempo</Text>
          </View>

          <View style={styles.lineSeparator}/>
          
          <View style={styles.itemQnt}>
            <View style={[styles.defineRow, styles.defineTempRow]}>
              <Text style={styles.txtBottomItems}>200</Text>
              <Text style={styles.txtTemp}>°C</Text>
            </View>
            <Text style={styles.textTitle}>Temperatura</Text>
          </View>
      </View>
      <View style={styles.fullWidth}>
        <Forward goTo="COFIGURAR_FORNO" {...navigationProps}/>
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
  spacingItems:{
    justifyContent:"space-evenly"
  },
  textTitle: {
    fontFamily: "ZenLight",
    fontSize: 20,
    color: "#000",
  },
  itemQnt:{
    alignItems:"center"
  },
  defineQntRow:{
    alignItems:"flex-end"
  },
  defineTempRow:{
    alignItems:"flex-start"
  },
  defineRow:{
    flexDirection:"row",
  },
  txtMainQnt:{
    fontFamily:"ZenLight",
    fontSize:80,
  },
  txtMainQntG:{
    fontFamily:"ZenLight",
    fontSize:40,
    marginBottom:15
  },
  txtTemp:{
    fontFamily:"ZenLight",
    fontSize:10,
    marginTop:20
  },
  txtBottomItems:{
    fontFamily:"ZenLight",
    fontSize:50,
  },
  lineSeparator:{
    width:1,
    height:98,
    backgroundColor:"#7D7D7D",
  },
  itemsRowSpacing:{
    width:width/1.2,
    justifyContent:"space-around",
  },
  fullWidth:{
    width,
    alignItems:"flex-end",
    marginRight:50
  }
});
