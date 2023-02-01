import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../utils/axios.js";

const initialState = {
  comments: [],
  loading: false
}

export const createComment = createAsyncThunk('comment/createComment', async ({ postId, comment }) => {
  try {
    const { data } = await axios.post(`/comments/${postId}`, {
      postId,
      comment
    })

    return data
  } catch (error) {
    console.log(error)
  }
})

export const getPostComments = createAsyncThunk('comment/getPostComments', async (postId) => {
  try {
    const { data } = await axios.get(`/posts/comments/${postId}`)

    return data
  } catch (error) {
    console.log(error)
  }
})

export const removeComment = createAsyncThunk('comment/removeComment', async ({ postId, commentId }) => {
  try {
    const { data } = await axios.delete(`/comments/${postId}`, {
      data: {
        postId,
        commentId
      }
    })

    return data
  } catch (error) {
    console.log(error)
  }
})

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create comment
    builder.addCase(createComment.pending, (state) => {
      state.loading = true
    })
    .addCase(createComment.fulfilled, (state, action) => {
      state.loading = false
      state.comments.push(action.payload)
    })
    .addCase(createComment.rejected, (state) => {
      state.loading = false
    })
    // Get post comments
    builder.addCase(getPostComments.pending, (state) => {
      state.loading = true
    })
    .addCase(getPostComments.fulfilled, (state, action) => {
      state.loading = false
      state.comments = action.payload
    })
    .addCase(getPostComments.rejected, (state) => {
      state.loading = false
    })
    // Remove comment
    builder.addCase(removeComment.pending, (state) => {
      state.loading = true
    })
    .addCase(removeComment.fulfilled, (state, action) => {
      const index = state.comments.indexOf(action)
      
      state.loading = false
      state.comments.splice(index, 1)
    })
    .addCase(removeComment.rejected, (state) => {
      state.loading = false
    })
  }
})

export default commentSlice.reducer