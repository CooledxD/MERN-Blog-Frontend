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

    sessionStorage.setItem('isAuth', true)

    return data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

// Logout
export const logoutAuthState = createAsyncThunk('auth/logoutAuthState', async () => {
  try {
    const { data } = axios.get('auth/logout')

    sessionStorage.clear('isAuth')

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
    builder.addCase(logoutAuthState.pending, (state) => {
      state.isLoading = true
      state.status = null
    })
    .addCase(logoutAuthState.fulfilled, (state) => {
      state.isLoading = false
      state.status = null
      state.token = null
    })
    .addCase(logoutAuthState.rejected, (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    })
  }
})

export default authSlice.reducer