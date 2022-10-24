import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../storage";
import { reduxValues } from "../typesReducer";

const initialState: reduxValues = {
  ovenConfiguration: false,
  heatStatus: false,
  ovenConnected: false,
  temperature: 0,
  heatFinished: false,
  recycleStated: false,
  recycleFinished: false,
};

export const reducerSlice = createSlice({
  name: "commands",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    ovenConnected: (state, action: PayloadAction<boolean>) => {
      state.ovenConnected = action.payload;
    },
    ovenConfig: (state, action: PayloadAction<boolean>) => {
      state.ovenConfiguration = action.payload;
    },
    heating: (state, action: PayloadAction<boolean>) => {
      state.heatStatus = action.payload;
    },
    temperature: (state, action: PayloadAction<number>) => {
      state.temperature = action.payload;
    },
    heatFinished: (state, action: PayloadAction<boolean>) => {
      state.heatFinished = action.payload;
    },
    recycleStarted: (state, action: PayloadAction<boolean>) => {
      state.recycleStated = action.payload;
    },
    recycleFinished: (state, action: PayloadAction<boolean>) => {
      state.recycleFinished = action.payload;
    },
  },
});

export const {
  ovenConnected,
  ovenConfig,
  heating,
  temperature,
  heatFinished,
  recycleStarted,
  recycleFinished,
} = reducerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const ovenConnectedStatus = (state: RootState) =>
  state.communicate.ovenConnected;

export const selectConfigurated = (state: RootState) =>
  state.communicate.ovenConfiguration;

export const heatingStatus = (state: RootState) => state.communicate.heatStatus;

export const currentTemperature = (state: RootState) =>
  state.communicate.temperature;

export const isHeatFinished = (state: RootState) =>
  state.communicate.heatFinished;

export const isRecycleStarted = (state: RootState) =>
  state.communicate.recycleStated;

export const isRecycleFinished = (state: RootState) =>
  state.communicate.recycleFinished;

export default reducerSlice.reducer;
