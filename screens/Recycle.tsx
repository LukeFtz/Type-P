import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { RootStackParamList } from "../utilities/types";

type screenNavigationProp = StackScreenProps<RootStackParamList, "Recycle">;

const Recycle: React.FC<screenNavigationProp> = ({ navigation }) => {
  return <View />;
};

export default Recycle;
