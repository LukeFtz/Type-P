// import {
//   cancelProcess,
//   defineOvenSettings,
//   getTempStored,
//   getTimeStored,
//   heatOven,
//   ovenStartRecycle,
// } from "./functions";
import { confirmDBConnection, confirmOvenConnected } from "./functions";
import { valuesNumbers } from "./types";
import { setValueNumbers } from "./values";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyACrfFDWM3lGfD2XUIofP1BefI-CvsWJ3M",
  databaseURL: "https://type-p-default-rtdb.firebaseio.com/",
  projectId: "187863728332",
  storageBucket: "type-p.appspot.com",
  // messagingSenderId: 'sender-id',
  // appId: 'app-id',
  // measurementId: 'G-measurement-id',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const connectAppToFirebase = () => {
  return confirmDBConnection(database);
};
export const verifyOvenConnection = () => {
  return confirmOvenConnected(database);
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
