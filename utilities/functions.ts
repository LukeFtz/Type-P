import { FROM_OVEN, TO_OVEN } from "./values";
import { getItemAsync } from "expo-secure-store";
import { communication, communicationOven } from "./types";
import { Database, ref, set, get, child } from "firebase/database";

export const confirmDBConnection = async (dataBase: Database) => {
  const dataConfirmation: communication = {
    func: "APP_CONNECTED",
    val: true,
  };
  return await set(ref(dataBase, TO_OVEN), { dataConfirmation })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

export const confirmOvenConnected = async (dataBase: Database) => {
  const refDb = ref(dataBase);
  return await get(child(refDb, FROM_OVEN))
    .then((response) => {
      if (response.val() !== null) {
        const value: communicationOven = response.val();
        if (value.func === "OVEN_CONNECTED" && value.val === true) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    })
    .catch(() => {
      return false;
    });
};

// export const defineOvenSettings = (websocket: WebSocket) => {
//   getItemAsync("storage")
//     .then((item) => {
//       if (item) {
//         let valueOfItem = JSON.parse(item);
//         valueOfItem = { func: "DEF_OVEN", val: valueOfItem };
//         websocket.send(JSON.stringify(valueOfItem));
//       }
//     })
//     .catch((e) => {
//       console.log(e);
//     });
// };

// export const heatOven = (websocket: WebSocket, token: string) => {
//   const socketData: communication = { func: "STRT_HEAT", token };
//   websocket.send(JSON.stringify(socketData));
// };

// export const getTempStored = async () => {
//   const storageValue = await getItemAsync("storage");
//   let valueOfItem: storageitems;
//   if (storageValue) {
//     valueOfItem = JSON.parse(storageValue);
//   } else {
//     valueOfItem = { tempo: "00:00", temperatura: 0 };
//   }
//   return valueOfItem.temperatura;
// };

// export const getTimeStored = async () => {
//   const storageValue = await getItemAsync("storage");
//   let valueOfItem: storageitems;
//   if (storageValue) {
//     valueOfItem = JSON.parse(storageValue);
//   } else {
//     valueOfItem = { tempo: "00:00", temperatura: 0 };
//   }
//   return valueOfItem.tempo;
// };

// export const ovenStartRecycle = (websocket: WebSocket, token: string) => {
//   const socketData: communication = { func: "STRT_RECYCLE", token };
//   websocket.send(JSON.stringify(socketData));
// };

// export const cancelProcess = (websocket: WebSocket, token: string) => {
//   const socketData: communication = { func: "CANCEL", token };
//   websocket.send(JSON.stringify(socketData));
// };
