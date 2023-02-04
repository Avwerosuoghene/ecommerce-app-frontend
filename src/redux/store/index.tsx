import { createSlice, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import snackBarSlice from "./snackbar";

const store = configureStore({
  reducer: { snackBar: snackBarSlice.reducer, auth: authSlice.reducer },
});

export default store;
