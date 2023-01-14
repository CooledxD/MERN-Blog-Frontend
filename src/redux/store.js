import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice
  }
})