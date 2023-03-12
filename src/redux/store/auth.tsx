import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";


const initialAuthState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  isLoggedIn: !!localStorage.getItem("token"),
  userType: localStorage.getItem("userType")? localStorage.getItem("userType"): undefined
};
// const dispatch = useDispatch();

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    // login(state, action: {payload :any}) {
    //     state.token = action.payload,
    //     state.isLoggedIn = !!state.token,
    // },
    login(state, action: { payload: { token: string; userId: string; userType: string } }) {
      state.token = action.payload.token;
      state.isLoggedIn = !!state.token;
      state.userType = action.payload.userType;
      localStorage.setItem("token", state.token);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("userType", action.payload.userType);

      
    },
    logout(state: any) {
      state.token = null;
      state.isLoggedIn = false;
      state.userType = undefined;
      localStorage.removeItem("token");
      localStorage.removeItem("expiryDate");
      localStorage.removeItem("userId");
      localStorage.removeItem("userType");
    },
    autoLogin(state: any) {
      console.log("inside autoligin");
      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token") as string;
        const userId = localStorage.getItem("userId") as string;
        state.userType = localStorage.getItem("userType") as string;
        state.isLoggedIn = !!state.token;
        console.log(state.isLoggedIn);
      } else {
        return;
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
