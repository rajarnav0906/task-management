import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!localStorage.getItem("token"),
    token: localStorage.getItem("token"),
    user: localStorage.getItem("user") && localStorage.getItem("user") !== 'undefined' ? JSON.parse(localStorage.getItem("user")) : null, // Safely check for undefined or null
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
