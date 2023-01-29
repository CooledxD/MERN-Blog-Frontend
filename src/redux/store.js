import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./features/auth/authSlice.js";
import postSlice from "./features/post/postSlice.js";
import commentSlice from "./features/comment/commentSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    post: postSlice,
    comment: commentSlice
  }
})