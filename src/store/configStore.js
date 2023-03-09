import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./features/auth/authSlice.js";
import postSlice from "./features/post/postSlice.js";
import commentSlice from "./features/comment/commentSlice.js";
import userSlice from "./features/user/userSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    post: postSlice,
    comment: commentSlice
  }
})