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
  FinishedScreen: undefined;
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
  func:
    | "APP_CONNECTED"
    | "CONFIG_OVEN"
    | "STRT_HEAT"
    | "STRT_RECYCLE"
    | "CANCEL_HEAT"
    | "CANCEL_RECYCLE"
    | "SET_DEFAULT";
  val?: string | number | JSON | boolean;
}

export interface communicationOven {
  func:
    | "OVEN_CONNECTED"
    | "OVEN_CONFIGURATED"
    | "OVEN_HEATTING"
    | "HEAT_TEMP"
    | "HEAT_DONE"
    | "RECYCLE_STARTED"
    | "RECYCLING"
    | "RECYCLE_FINISHED"
    | "HEAT_CANCELED"
    | "RECYCLE_CANCELED";
  val?: string | number | JSON | boolean;
}

export interface storageitems {
  time: string;
  temperature: number;
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
