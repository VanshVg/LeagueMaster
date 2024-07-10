import { createSlice } from "@reduxjs/toolkit";

import { IProfile } from "../../pages/Dashboard/Settings";

const initialState: IProfile = {
  username: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setProfile(state, action) {
      state.username = action.payload.username;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { setProfile } = userSlice.actions;
