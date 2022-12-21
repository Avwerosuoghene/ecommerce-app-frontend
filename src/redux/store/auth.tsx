import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const initialAuthState = { token: localStorage.getItem('token')?localStorage.getItem('token'): '' , isLoggedIn: !!localStorage.getItem('token') };
// const dispatch = useDispatch();

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    // login(state, action: {payload :any}) {
    //     state.token = action.payload,
    //     state.isLoggedIn = !!state.token,
    // },
    login(state, action: { payload: {token: string, userId: string} }) {
      state.token = action.payload.token;
      state.isLoggedIn = !!state.token;
      localStorage.setItem("token", state.token);
      localStorage.setItem("userId", action.payload.userId);
        
    },
    logout(state: any) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('expiryDate');
      localStorage.removeItem('userId');
    },
    autoLogin(state: any) {
        console.log('inside autoligin')
       if (localStorage.getItem('token') ) {
        const token = localStorage.getItem('token') as string ;
        const userId = localStorage.getItem('userId')  as string
        state.isLoggedIn = !!token;
        console.log(state.isLoggedIn)
       } else {
        return
       }
    }
  },
 
});

export const authActions = authSlice.actions;

export default authSlice;
