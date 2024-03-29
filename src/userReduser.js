import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    accessToken: null,
    profile: null,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.accessToken = payload;
    },
    setUserProfile: (state, { payload }) => {
      state.profile = payload;
    },
    clearUser: (state) => {
      state.accessToken = null;
      state.profile = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, clearUser, setUserProfile } = user.actions;

export default user.reducer;
