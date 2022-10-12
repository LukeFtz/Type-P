import {
  cancelProcess,
  defineOvenSettings,
  getTempStored,
  getTimeStored,
  heatOven,
  ovenStartRecycle,
} from "./functions";
import { valuesNumbers } from "./types";
import { setValueNumbers } from "./values";

let websocket: WebSocket;
let token: string;

export const connectToRedisServer = () => {
  websocket = new WebSocket("ws://192.168.0.113:8000/ws/redis/");
  return websocket;
};

export const getToken = () => {
  const sendData = {
    func: "GEN_TOKEN",
  };
  try {
    websocket.onopen = () => {
      websocket.send(JSON.stringify(sendData));
      return Promise.resolve(true);
    };
  } catch (e) {
    return Promise.resolve(false);
  }
};

export const setToken = (token: string) => {
  token;
};

export const getWebSocket = () => {
  return websocket;
};

export const defineSettings = (tokenDefined: string) => {
  // token = tokenDefined;
  defineOvenSettings(websocket, tokenDefined);
};

export const startHeatting = () => {
  heatOven(websocket, token);
};

export const startRecycle = () => {
  ovenStartRecycle(websocket, token);
};

export const getTemp = async () => {
  return await getTempStored();
};

export const getTime = async () => {
  return await getTimeStored();
};

export const cancelCurrentProcess = () => {
  cancelProcess(websocket, token);
};

export const defineValue = (props: valuesNumbers) => {
  return setValueNumbers(props);
};
