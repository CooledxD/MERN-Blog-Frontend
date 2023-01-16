import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null
}

export const registerUser = createAsyncThunk('auth/registerUser', async ({ username, password, email }) => {
  try {
    const { data } = await axios.post('/auth/register', {
      username,
      password,
      email
    })

    if (data.token) {
      window.localStorage.setItem('token', data.token)
    }

    return data
  } catch (error) {
    console.log(error)
  }
})

export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }) => {
  try {
    const { data } = await axios.post('/auth/login', {
      username,
      password
    })

    if (data.token) {
      window.localStorage.setItem('token', data.token)
    }

    return data
  } catch (error) {
    console.log(error)
  }
})

export const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const { data } = await axios.get('/auth/me')

    return data
  } catch (error) {
    console.log(error)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isLoading = false
      state.status = null
    }
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true
      state.status = null
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.status = action.payload.message
      state.user = action.payload.user
      state.token = action.payload.token
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    })

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true
      state.status = null
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false
      state.status = action.payload.message
      state.user = action.payload.user
      state.token = action.payload.token
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    })

    // Get me
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true
      state.status = null
    })
    .addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false
      state.status = null
      state.user = action.payload?.user
      state.token = action.payload?.token
    })
    .addCase(getMe.rejected, (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    })
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer