import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../storage";
import { utilitesValues } from "../typesReducer";

const initialState: utilitesValues = {
  currentTime: "00:00",
};

export const reducerSlice = createSlice({
  name: "commands",
  initialState,
  reducers: {
    updateTime: (state, action: PayloadAction<number>) => {
      const sec = action.payload;
      const newTime = new Date(sec * 1000).toISOString().slice(11, 19);
      state.currentTime = newTime;
    },

    setDefaultTime: (state) => {
      state.currentTime = "00:00:00";
    },
  },
});

export const { updateTime, setDefaultTime } = reducerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const currentRecycleTime = (state: RootState) =>
  state.utilities.currentTime;

export default reducerSlice.reducer;
