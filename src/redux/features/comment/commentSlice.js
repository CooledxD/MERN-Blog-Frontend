import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../utils/axios.js";

const initialState = {
  comments: [],
  loading: false
}

// Create comment
export const createComment = createAsyncThunk('comment/createComment', async ({ postId, comment, authorAvatar }) => {
  try {
    const { data } = await axios.post(`/comments`, {
      postId,
      comment,
      authorAvatar
    })

    return data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
})

// Getting comments on a post
export const getPostComments = createAsyncThunk('comment/getPostComments', async (postId) => {
  try {
    const { data } = await axios.get(`/posts/${postId}/comments`)

    return data
  } catch (error) {
    console.log(error.message)
  }
})

// Remove comment
export const removeComment = createAsyncThunk('comment/removeComment', async ({ postId, commentId }) => {
  try {
    const { data } = await axios.delete(`/comments`, {
      data: {
        postId,
        commentId
      }
    })

    return data
  } catch (error) {
    console.log(error.message)
  }
})

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    removeComments: (state) => {
      state.comments = []
    }
  },
  extraReducers: (builder) => {
    // Create comment
    builder.addCase(createComment.pending, (state) => {
      state.loading = true
    })
    .addCase(createComment.fulfilled, (state, action) => {
      state.loading = false
      state.comments.push(action.payload.newComment)
    })
    .addCase(createComment.rejected, (state) => {
      state.loading = false
    })

    // Getting comments on a post
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
      // Getting the index of the target comment
      const index = state.comments.findIndex(comment => comment._id === action.meta.arg.commentId)
      
      state.loading = false
      state.comments.splice(index, 1)
    })
    .addCase(removeComment.rejected, (state) => {
      state.loading = false
    })
  }
})

export const { removeComments } = commentSlice.actions

export default commentSlice.reducer