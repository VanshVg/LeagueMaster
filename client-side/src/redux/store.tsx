import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { sidebarReducer } from "./reducers/sidebarReducer";

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
});

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;

export default store;
