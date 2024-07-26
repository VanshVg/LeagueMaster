import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { sidebarReducer } from "./reducers/sidebarReducer";
import { leagueReducer } from "./reducers/leaguesReducer";
import { userReducer } from "./reducers/userReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  userLeagues: leagueReducer,
  user: userReducer,
  auth: authReducer,
});

const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;

export default store;
