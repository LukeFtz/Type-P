import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../storage";
import { reduxValues } from "../typesReducer";

const initialState: reduxValues = {
  ovenConnected: false,
  ovenConfiguration: false,
  heatStatus: false,
  temperature: 0,
  heatFinished: false,
  recycleStated: false,
  recycleFinished: false,
  heatCanceled: false,
  recycleCanceled: false,
};

export const reducerSlice = createSlice({
  name: "commands",
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
    heatCanceled: (state, action: PayloadAction<boolean>) => {
      state.heatCanceled = action.payload;
    },
    recycleCanceled: (state, action: PayloadAction<boolean>) => {
      state.recycleCanceled = action.payload;
    },
    setDefault: (state) => {
      (state.ovenConnected = false),
        (state.ovenConfiguration = false),
        (state.heatStatus = false),
        (state.temperature = 0),
        (state.heatFinished = false),
        (state.recycleStated = false),
        (state.recycleFinished = false),
        (state.heatCanceled = false),
        (state.recycleCanceled = false);
    },
    setDefaultReducerValues: (state) => {
      (state.ovenConfiguration = false),
        (state.heatStatus = false),
        (state.temperature = 0),
        (state.heatFinished = false),
        (state.recycleStated = false),
        (state.recycleFinished = false),
        (state.heatCanceled = false),
        (state.recycleCanceled = false);
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
  heatCanceled,
  recycleCanceled,
  setDefault,
  setDefaultReducerValues,
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

export const isHeatCanceled = (state: RootState) =>
  state.communicate.heatCanceled;

export const isRecycleCanceled = (state: RootState) =>
  state.communicate.recycleCanceled;

export default reducerSlice.reducer;
