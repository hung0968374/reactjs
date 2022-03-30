import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "userInfo",
  initialState: {
    userAuthenticated: false,
    otherInfos: {},
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userAuthenticated = true;
      if (action) {
        state.otherInfos = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserInfo } = authSlice.actions;

export default authSlice.reducer;
