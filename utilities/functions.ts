import { getItemAsync } from "expo-secure-store";
import { communication, storageitems } from "./types";

export const defineOvenSettings = (websocket: WebSocket, token: string) => {
  getItemAsync("storage")
    .then((item) => {
      if (item) {
        let valueOfItem = JSON.parse(item);
        valueOfItem = { func: "DEF_OVEN", val: valueOfItem, token: token };
        websocket.send(JSON.stringify(valueOfItem));
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const heatOven = (websocket: WebSocket, token: string) => {
  const socketData: communication = { func: "STRT_HEAT", token };
  websocket.send(JSON.stringify(socketData));
};

export const getTempStored = async () => {
  const storageValue = await getItemAsync("storage");
  let valueOfItem: storageitems;
  if (storageValue) {
    valueOfItem = JSON.parse(storageValue);
  } else {
    valueOfItem = { tempo: "00:00", temperatura: 0 };
  }
  return valueOfItem.temperatura;
};

export const getTimeStored = async () => {
  const storageValue = await getItemAsync("storage");
  let valueOfItem: storageitems;
  if (storageValue) {
    valueOfItem = JSON.parse(storageValue);
  } else {
    valueOfItem = { tempo: "00:00", temperatura: 0 };
  }
  return valueOfItem.tempo;
};

export const ovenStartRecycle = (websocket: WebSocket, token: string) => {
  const socketData: communication = { func: "STRT_RECYCLE", token };
  websocket.send(JSON.stringify(socketData));
};

export const cancelProcess = (websocket: WebSocket, token: string) => {
  const socketData: communication = { func: "CANCEL", token };
  websocket.send(JSON.stringify(socketData));
};
