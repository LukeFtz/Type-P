import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Type: undefined;
  Configuration: undefined;
  OvenConection: undefined;
  OvenConfiguration: undefined;
  Heat: undefined;
  Recycle: undefined;
};

export type navigationProps = {
  goTo: "CONFIGIGURATION" | "COFIGURAR_FORNO";
  tempo?: string;
  temperatura?: number;
} & StackScreenProps<RootStackParamList>;
export type navigationPropsConfigOven = StackScreenProps<RootStackParamList>;

export interface connectionWebSocket {
  websocket: WebSocket;
  connected: boolean;
}

export interface InScreen {
  apperInScreen: boolean;
}

export interface communication {
  func: "STRT_HEAT" | "OVEN_TEMP" | "STRT_RECYCLE";
  val?: string | number;
  token: string;
}

export interface storageitems {
  tempo: string;
  temperatura: number;
}
