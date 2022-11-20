import { configureStore } from "@reduxjs/toolkit";
import communicationReducer from "./reducers/reducer";
import utilitiesReducer from "./reducers/utilities";

const store = configureStore({
  reducer: {
    communicate: communicationReducer,
    utilities: utilitiesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
