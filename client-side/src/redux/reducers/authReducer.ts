import { createSlice } from "@reduxjs/toolkit";

const access_token = localStorage.getItem("access_token")
  ? localStorage.getItem("access_token")
  : null;

const initialState = {
  access_token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem("access_token", action.payload);
      state.access_token = action.payload;
    },
    logout(state) {
      localStorage.removeItem("access_token");
      state.access_token = null;
    },
  },
});

const authReducer = authSlice.reducer;

export const { login, logout } = authSlice.actions;

export default authReducer;
