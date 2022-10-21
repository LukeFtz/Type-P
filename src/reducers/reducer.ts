import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as actionsTypes from "../actions/types";
import { RootState } from "../storage";
import { reduxValues } from "../typesReducer";

const initialState: reduxValues = {
  ovenConfiguration: false,
};

export const reducerSlice = createSlice({
  name: "commands",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    ovenConfig: (state, action: PayloadAction<boolean>) => {
      state.ovenConfiguration = action.payload;
    },
  },
});

export const { ovenConfig } = reducerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) =>
  state.communicate.ovenConfiguration;

export default reducerSlice.reducer;
