import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../utils/axios.js";

const initialState = {
  token: null,
  isLoading: false,
  status: null
}

// Renew access token
export const renewAccessToken = createAsyncThunk('auth/renewAccessToken', async (_, {rejectWithValue}) => {
  try {
    const { data } = await axios.post('/auth/renew-access-token')

    return data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

// Logout
export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  try {
    const { data } = axios.get('auth/logout')

    return data
  } catch (error) {
    console.log(error.message)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Renew access token
    builder.addCase(renewAccessToken.pending, (state) => {
      state.isLoading = true
      state.status = null
    })
    .addCase(renewAccessToken.fulfilled, (state, action) => {
      state.isLoading = false
      state.status = null
      state.token = action.payload.accessToken
    })
    .addCase(renewAccessToken.rejected, (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    })

    // Logout
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoading = true
      state.status = null
    })
    .addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false
      state.status = null
      state.token = null
    })
    .addCase(logoutUser.rejected, (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    })
  }
})

export default authSlice.reducer