import { FROM_OVEN } from "./values";
import { communicationOven } from "./types";
import { Database, ref, onValue } from "firebase/database";
import {
  heatFinished,
  heating,
  ovenConfig,
  ovenConnected,
  recycleFinished,
  recycleStarted,
  temperature,
} from "../src/reducers/reducer";
import store from "../src/storage";

let dataBase: Database;

export const defineReduxDataBase = (currentDataBase: Database) => {
  dataBase = currentDataBase;
};

export const verifyDataUpdate = () => {
  const dataRef = ref(dataBase, FROM_OVEN);
  onValue(dataRef, (snapshot) => {
    console.log(snapshot.val());
    const data: communicationOven = snapshot.val();
    if (data) {
      if (data.func === "OVEN_CONNECTED") {
        store.dispatch(ovenConnected(true));
      } else if (data.func === "OVEN_CONFIGURATED") {
        store.dispatch(ovenConfig(true));
      } else if (data.func === "OVEN_HEATTING") {
        store.dispatch(heating(true));
      } else if (data.func === "HEAT_TEMP") {
        store.dispatch(temperature(Number.parseInt(data.val + "")));
      } else if (data.func === "HEAT_DONE") {
        store.dispatch(heatFinished(true));
      } else if (data.func === "RECYCLING") {
        store.dispatch(temperature(Number.parseInt(data.val + "")));
      } else if (data.func === "RECYCLE_STARTED") {
        store.dispatch(recycleStarted(true));
      } else if (data.func === "RECYCLE_FINISHED") {
        store.dispatch(recycleFinished(true));
      }
    }
  });
};
