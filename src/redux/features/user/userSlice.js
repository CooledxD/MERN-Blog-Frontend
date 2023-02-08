import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";

const initialState = {
  user: null,
  isLoading: false,
  status: null
}

export const getUser = createAsyncThunk('user/getUser', async () => {
  try {
    const { data } = await axios.get('/user/get')

    return data
  } catch (error) {
    console.log(error)
  }
})

export const updateAvatar = createAsyncThunk('user/updateAvatar', async (newAvatar) => {
  try {
    const { data } = await axios.put('user/avatar', newAvatar)

    return data
  } catch (error) {
    console.log(error)
  }
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addPostUserState: (state, action) => {
      state.user.posts.push(action.payload)
    },
    removePostUserState: (state, action) => {
      const index = state.user.posts.findIndex(post => post === action.payload)

      state.user.posts.splice(index, 1)
    },
    addLikeUserState: (state, action) => {
      state.user.likes.push(action.payload)
    },
    removeLikeUserState: (state, action) => {
      const index = state.user.likes.findIndex(like => like === action.payload)

      state.user.likes.splice(index, 1)
    }
  },
  extraReducers: (builder) => {
    // Get user info
    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true
      state.status = null
    })
    .addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.user = action.payload.user
    })
    .addCase(getUser.rejected, (state) => {
      state.isLoading = false
    })

    // Update avatar
    builder.addCase(updateAvatar.pending, (state) => {
      state.isLoading = true
      state.status = null
    })
    .addCase(updateAvatar.fulfilled, (state, action) => {
      state.isLoading = false
      state.user.avatar = action.payload.avatar
    })
    .addCase(updateAvatar.rejected, (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    })
  }
})

export const { addPostUserState, removePostUserState, addLikeUserState, removeLikeUserState } = userSlice.actions

export default userSlice.reducer