import axios from './axios.js'

// Register
export const registerUser = async ({ username, password, email, confirmPassword }) => {
  try {
    const { data } = await axios.post('/auth/register', {
      username,
      password,
      confirmPassword,
      email
    })

    return data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

// Activate account
export const activateAccount = async ({ activationToken }) => {
  try {
    const { data } = await axios.post('/auth/activate-account', {
      activationToken
    })

    return data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}

// Login
export const loginUser = async ({ username, password }) => {
  try {
    const { data } = await axios.post('/auth/login', {
      username,
      password
    })

    return data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}