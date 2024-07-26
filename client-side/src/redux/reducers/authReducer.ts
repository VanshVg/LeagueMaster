import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token") ? localStorage.getItem("token") : null;

const initialState = {
  token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      localStorage.setItem("token", action.payload);
      state.token = action.payload;
    },
    logout(state) {
      localStorage.removeItem("token");
      state.token = null;
    },
  },
});

const authReducer = authSlice.reducer;

export const { login, logout } = authSlice.actions;

export default authReducer;
