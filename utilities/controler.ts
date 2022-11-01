import {
  cancelHeatProcess,
  cancelRecycleProcess,
  getTempStored,
  getTimeSec,
  getTimeStored,
  heatOven,
  startRecycling,
  confirmDBConnection,
  defineDataBase,
  setOvenConfiguration,
  defaultValue,
  resetOvenConfig,
} from "./functions";

import { valuesNumbers } from "./types";
import { EMAIL, PASSWORD, setValueNumbers } from "./values";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { defineReduxDataBase, verifyDataUpdate } from "./reduxFunctions";

const firebaseConfig = {
  apiKey: "AIzaSyACrfFDWM3lGfD2XUIofP1BefI-CvsWJ3M",
  databaseURL: "https://type-p-default-rtdb.firebaseio.com/",
  projectId: "187863728332",
  storageBucket: "type-p.appspot.com",
  messagingSenderId: "ilYVDwTgT8VnS63Wa0DCnvMhRQU2",
  // appId: 'app-id',
  // measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const auth = getAuth(app);
signInWithEmailAndPassword(auth, EMAIL, PASSWORD);

defineDataBase(database);
defineReduxDataBase(database);
verifyDataUpdate();

export const connectAppToFirebase = () => {
  return confirmDBConnection();
};

export const configureOvenSettings = () => {
  setOvenConfiguration();
};

export const setDefaultValues = () => {
  defaultValue();
};

export const startHeatting = () => {
  heatOven();
};

export const startRecycle = () => {
  startRecycling();
};

export const getTemp = async () => {
  return await getTempStored();
};

export const getTime = async () => {
  return await getTimeStored();
};

export const getTimeInSeconds = async () => {
  return await getTimeSec();
};

export const cancelHeat = () => {
  cancelHeatProcess();
};

export const cancelRecycle = () => {
  cancelRecycleProcess();
};

export const defineValue = (props: valuesNumbers) => {
  return setValueNumbers(props);
};

export const resetOvenConfiguration = () => {
  resetOvenConfig();
};
