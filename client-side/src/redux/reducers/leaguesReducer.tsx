import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userLeagues: [],
};

const leagueSlice = createSlice({
  name: "leagues",
  initialState,
  reducers: {
    setUserLeagues(state, action) {
      state.userLeagues = action.payload;
    },
  },
});

export const leagueReducer = leagueSlice.reducer;
export const { setUserLeagues } = leagueSlice.actions;
