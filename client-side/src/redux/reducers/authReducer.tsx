import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    clearAuthState(state) {
      (state.user = null), (state.token = null), (state.isAuthenticated = false);
    },
    authenticateUser(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUser, setToken, clearAuthState, authenticateUser } = authSlice.actions;

export default authSlice.reducer;
