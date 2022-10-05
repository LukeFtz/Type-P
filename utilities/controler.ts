import { communication } from "./types";
import { defineOvenSettings, getTempStored, heatOven } from "./functions";

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

export const getWebSocket = () => {
  return websocket;
};

export const defineSettings = (tokenDefined: string) => {
  token = tokenDefined;
  defineOvenSettings(websocket, tokenDefined);
};

export const startHeatting = () => {
  heatOven(websocket, token);
};

export const getTemp = async () => {
  return await getTempStored();
};
