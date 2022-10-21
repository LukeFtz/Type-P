import { FROM_OVEN } from "./values";
import { communicationOven } from "./types";
import { Database, ref, onValue } from "firebase/database";
import { ovenConfig } from "../src/reducers/reducer";
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
    if (data.func === "OVEN_CONNECTED" && data.val === true) {
      store.dispatch(ovenConfig(true));
    }
  });
};
