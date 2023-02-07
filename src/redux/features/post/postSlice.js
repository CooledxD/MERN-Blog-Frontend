import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";

const initialState = {
  posts: [],
  popularPosts: [],
  userPosts: [],
  loading: false
}

export const createPost = createAsyncThunk('post/createPost', async (params) => {
  try {
    const { data } = await axios.post('/posts', params)

    return data
  } catch (error) {
    console.log(error)
  }
})

export const getAllPosts = createAsyncThunk('post/getAllPosts', async () => {
  try {
    const { data } = await axios.get('/posts')
    
    return data
  } catch (error) {
    console.log(error)
  }
})

export const removePost = createAsyncThunk('post/removePost', async (id) => {
  try {
    const { data } = await axios.delete(`posts/${id}`, id)

    return data
  } catch (error) {
    console.log(error)
  }
})

export const updatePost = createAsyncThunk('post/updatePost', async (updatePost) => {
  try {
    const { data } = await axios.put(`posts/${updatePost.id}`, updatePost)

    return data
  } catch (error) {
    console.log(error)
  }
})

export const getUserPosts = createAsyncThunk('post/getUserPosts', async () => {
  try {
    const { data } = await axios.get('/posts/user')

    return data
  } catch (error) {
    console.log(error)
  }
})

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create Post
    builder.addCase(createPost.pending, (state) => {
      state.loading = true
    })
    .addCase(createPost.fulfilled, (state, action) => {
      state.loading = false
      state.posts.unshift(action.payload.newPost)
      state.userPosts.unshift(action.payload.newPost)
    })
    .addCase(createPost.rejected, (state) => {
      state.loading = false
    })
    // Get All Posts
    builder.addCase(getAllPosts.pending, (state) => {
      state.loading = true
    })
    .addCase(getAllPosts.fulfilled, (state, action) => {
      state.loading = false
      state.posts = action.payload.posts
      state.popularPosts = action.payload.popularPosts
    })
    .addCase(getAllPosts.rejected, (state) => {
      state.loading = false
    })
    // Remove post
    builder.addCase(removePost.pending, (state) => {
      state.loading = true
    })
    .addCase(removePost.fulfilled, (state, action) => {
      state.loading = false
      state.posts = state.posts.filter(post => post._id !== action.meta.arg)
      state.userPosts = state.userPosts.filter(post => post._id !== action.meta.arg)
    })
    .addCase(removePost.rejected, (state) => {
      state.loading = false
    })
    // Update post
    builder.addCase(updatePost.pending, (state) => {
      state.loading = true
    })
    .addCase(updatePost.fulfilled, (state, action) => {
      const indexPosts = state.posts.findIndex(post => post._id === action.payload._id)
      const indexUserPosts = state.posts.findIndex(post => post._id === action.payload._id)
      
      state.loading = false
      state.posts[indexPosts] = action.payload
      state.userPosts[indexUserPosts] = action.payload
    })
    .addCase(updatePost.rejected, (state) => {
      state.loading = false
    })
    // Get user posts
    builder.addCase(getUserPosts.pending, (state) => {
      state.loading = true
    })
    .addCase(getUserPosts.fulfilled, (state, action) => {
      state.loading = false
      state.userPosts = action.payload
    })
    .addCase(getUserPosts.rejected, (state) => {
      state.loading = false
    })
  }
})

export default postSlice.reducer