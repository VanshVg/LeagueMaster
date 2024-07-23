import { createSlice } from "@reduxjs/toolkit";
import { IUserLeagues } from "../../types/types";

const initialState: { userLeagues: IUserLeagues[] } = {
  userLeagues: [],
};

const leagueSlice = createSlice({
  name: "leagues",
  initialState,
  reducers: {
    setUserLeagues(state, action) {
      state.userLeagues = action.payload;
    },
    addUserLeague(state, action) {
      state.userLeagues.push(action.payload);
    },
  },
});

export const leagueReducer = leagueSlice.reducer;
export const { setUserLeagues, addUserLeague } = leagueSlice.actions;
