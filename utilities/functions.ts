import { FROM_OVEN, TO_OVEN } from "./values";
import { getItemAsync } from "expo-secure-store";
import { communication, communicationOven, storageitems } from "./types";
import { Database, ref, set, get, child } from "firebase/database";

let dataBase: Database;

export const defineDataBase = (currentDataBase: Database) => {
  dataBase = currentDataBase;
};

export const confirmDBConnection = async () => {
  const dataConfirmation: communication = {
    func: "APP_CONNECTED",
  };
  return await set(ref(dataBase, TO_OVEN), dataConfirmation)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

export const setOvenConfiguration = () => {
  getItemAsync("storage").then((item) => {
    if (item) {
      const dataConfirmation: communication = {
        func: "CONFIG_OVEN",
        val: JSON.parse(item),
      };
      set(ref(dataBase, TO_OVEN), dataConfirmation);
    }
  });
};

export const heatOven = () => {
  const dataFunction: communication = { func: "STRT_HEAT" };
  set(ref(dataBase, TO_OVEN), dataFunction);
};

export const startRecycling = () => {
  const dataFunction: communication = { func: "STRT_RECYCLE" };
  set(ref(dataBase, TO_OVEN), dataFunction);
};

export const getTempStored = async () => {
  const storageValue = await getItemAsync("storage");
  let valueOfItem: storageitems;
  if (storageValue) {
    valueOfItem = JSON.parse(storageValue);
  } else {
    valueOfItem = { time: "00:00", temperature: 0 };
  }
  return valueOfItem.temperature;
};

export const getTimeSec = async () => {
  const storageValue = await getItemAsync("storage");
  let valueOfItem: storageitems;
  if (storageValue) {
    valueOfItem = JSON.parse(storageValue);
  } else {
    valueOfItem = { time: "0", temperature: 0 };
  }
  return Number.parseInt(valueOfItem.time);
};

export const getTimeStored = async () => {
  const storageValue = await getItemAsync("stringTime");
  if (storageValue) {
    return storageValue;
    // valueOfItem = JSON.parse(storageValue);
  } else {
    return "00:00";
  }
};

// export const ovenStartRecycle = (websocket: WebSocket, token: string) => {
//   const socketData: communication = { func: "STRT_RECYCLE", token };
//   websocket.send(JSON.stringify(socketData));
// };

// export const cancelProcess = (websocket: WebSocket, token: string) => {
//   const socketData: communication = { func: "CANCEL", token };
//   websocket.send(JSON.stringify(socketData));
// };
