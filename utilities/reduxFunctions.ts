import { FROM_OVEN } from "./values";
import { communicationOven } from "./types";
import { Database, ref, onValue } from "firebase/database";
import {
  heatCanceled,
  heatFinished,
  heating,
  ovenConfig,
  ovenConnected,
  recycleCanceled,
  recycleFinished,
  recycleStarted,
  temperature,
  setDefaultReducerValues,
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
        store.dispatch(heatCanceled(false));
      } else if (data.func === "HEAT_TEMP") {
        store.dispatch(temperature(Number.parseInt(data.val + "")));
      } else if (data.func === "HEAT_DONE") {
        store.dispatch(heatFinished(true));
      } else if (data.func === "RECYCLING") {
        store.dispatch(temperature(Number.parseInt(data.val + "")));
      } else if (data.func === "RECYCLE_STARTED") {
        store.dispatch(recycleStarted(true));
        store.dispatch(recycleCanceled(false));
      } else if (data.func === "RECYCLE_FINISHED") {
        store.dispatch(recycleFinished(true));
        store.dispatch(setDefaultReducerValues());
      } else if (data.func === "HEAT_CANCELED") {
        store.dispatch(heatCanceled(true));
        store.dispatch(heating(false));
      } else if (data.func === "RECYCLE_CANCELED") {
        store.dispatch(recycleCanceled(true));
        store.dispatch(recycleStarted(false));
      }
    }
  });
};
