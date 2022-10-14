import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  Type: undefined;
  Configuration: undefined;
  WifiConfigurations: undefined;
  SelectWifi: undefined;
  StabilizingCommunication: { ssid: string };
  OvenConection: undefined;
  OvenConfiguration: undefined;
  Heat: undefined;
  Recycle: undefined;
};

export type navigationProps = {
  goTo:
    | "CONFIGIGURATION"
    | "COFIGURAR_FORNO"
    | "CONFIGURATE_WIFI"
    | "SELECT_WIFI";
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
  func: "STRT_HEAT" | "OVEN_TEMP" | "STRT_RECYCLE" | "CANCEL";
  val?: string | number;
  token: string;
}

export interface storageitems {
  tempo: string;
  temperatura: number;
}

export interface showModal {
  modalShow: boolean;
}

export interface valuesNumbers {
  uni: string;
  dec: string;
  cen: string;
}

export interface wifiData {
  ssid: string;
  strength: number;
  security: boolean;
}
