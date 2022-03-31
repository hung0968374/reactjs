import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "userInfo",
  initialState: {
    userAuthenticated: false,
    otherInfos: {},
    loading: false,
  },
  reducers: {
    onLoggingIn: (state) => {
      state.loading = true;
    },
    setUserInfo: (state, action) => {
      state.userAuthenticated = true;
      state.loading = false;
      if (action) {
        state.otherInfos = action.payload;
      }
    },
    onFailure: (state) => {
      state.loading = false;
    },
    logOut: (state) => {
      state.userAuthenticated = false;
      state.otherInfos = {};
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserInfo, logOut, onLoggingIn, onFailure } =
  authSlice.actions;

export default authSlice.reducer;
