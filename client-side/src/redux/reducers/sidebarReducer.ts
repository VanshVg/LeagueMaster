import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: true,
  isLeagueOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar(state) {
      if (state.isSidebarOpen) {
        state.isLeagueOpen = false;
      }
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleLeagues(state) {
      if (!state.isLeagueOpen) {
        state.isSidebarOpen = true;
      }
      state.isLeagueOpen = !state.isLeagueOpen;
    },
  },
});

export const sidebarReducer = sidebarSlice.reducer;
export const { toggleSidebar, toggleLeagues } = sidebarSlice.actions;
