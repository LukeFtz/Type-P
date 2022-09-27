import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Type: undefined;
  Configuration: undefined;
  OvenConection: undefined;
  OvenConfiguration: undefined;
};

export type navigationProps = {
  goTo: "CONFIGIGURATION" | "COFIGURAR_FORNO";
} & StackScreenProps<RootStackParamList>;
export type navigationPropsConfigOven = StackScreenProps<RootStackParamList>;
