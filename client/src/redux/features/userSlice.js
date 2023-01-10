import { createSlice } from "@reduxjs/toolkit";

//import { useSignInMutation, useSignUpMutation } from "../services/api";

const initialState = {
  authData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { authData: action?.payload };
    },
    logout: (state, action) => {
      localStorage.clear();
      return { authData: null };
    },
  },
});
export const { getUser, logout } = userSlice.actions;
export default userSlice.reducer;
