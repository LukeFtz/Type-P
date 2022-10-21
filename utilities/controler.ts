// import {
//   cancelProcess,
//   defineOvenSettings,
//   getTempStored,
//   getTimeStored,
//   heatOven,
//   ovenStartRecycle,
// } from "./functions";
import {
  confirmDBConnection,
  confirmOvenConnected,
  defineDataBase,
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

export const connectAppToFirebase = () => {
  verifyDataUpdate();
  return confirmDBConnection();
};
export const verifyOvenConnection = () => {
  return confirmOvenConnected();
};
// export const defineSettings = (tokenDefined: string) => {
//   // token = tokenDefined;
//   defineOvenSettings(websocket, tokenDefined);
// };

// export const startHeatting = () => {
//   heatOven(websocket, token);
// };

// export const startRecycle = () => {
//   ovenStartRecycle(websocket, token);
// };

// export const getTemp = async () => {
//   return await getTempStored();
// };

// export const getTime = async () => {
//   return await getTimeStored();
// };

// export const cancelCurrentProcess = () => {
//   cancelProcess(websocket, token);
// };

export const defineValue = (props: valuesNumbers) => {
  return setValueNumbers(props);
};
