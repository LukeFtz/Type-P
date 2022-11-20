import { FROM_OVEN, TO_OVEN } from "./values";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import {
  communication,
  communicationOven,
  setupValues,
  storageitems,
} from "./types";
import { Database, ref, set, get, child } from "firebase/database";
import store from "../src/storage";
import {
  heatFinished,
  ovenConfig,
  recycleCanceled,
} from "../src/reducers/reducer";

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

export const defaultValue = () => {
  const dataFunction: communication = { func: "DEFAULT" };
  set(ref(dataBase, TO_OVEN), dataFunction);
  const dataFunctionOven: communication = { func: "DEFAULT" };
  set(ref(dataBase, FROM_OVEN), dataFunctionOven);
};

export const heatOven = () => {
  store.dispatch(heatFinished(false));
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

export const cancelHeatProcess = () => {
  const dataFunction: communication = { func: "CANCEL_HEAT" };
  set(ref(dataBase, TO_OVEN), dataFunction);
};

export const cancelRecycleProcess = () => {
  const dataFunction: communication = { func: "CANCEL_RECYCLE" };
  set(ref(dataBase, TO_OVEN), dataFunction);
};

export const finishRecycleProccess = () => {
  const dataFunction: communication = { func: "RECICLE_DONE" };
  set(ref(dataBase, TO_OVEN), dataFunction);
};

export const resetOvenConfig = () => {
  const dataFunction: communication = { func: "SET_DEFAULT" };
  set(ref(dataBase, TO_OVEN), dataFunction);
  store.dispatch(ovenConfig(false));
};

export const getRecycleConfigs = (value: number) => {
  let valueToReturn: setupValues;

  if (value >= 50 && value <= 100) {
    valueToReturn = {
      temperature: 90,
      time: "00:15",
    };
  } else if (value > 100 && value <= 200) {
    valueToReturn = {
      temperature: 80,
      time: "00:35",
    };
  } else {
    valueToReturn = {
      temperature: 80,
      time: "00:40",
    };
  }
  return valueToReturn;
};
