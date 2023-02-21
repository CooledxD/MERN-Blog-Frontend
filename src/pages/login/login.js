import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Store
import { getUser } from "../../redux/features/user/userSlice.js";
import { renewAccessToken } from "../../redux/features/auth/authSlice.js";

// Utils
import { loginUser } from "../../utils/api.js";

// Components
import { ErrorMessage } from '../../components/errorMessage/errorMessage.js'

// Styles
import styles from './login.module.css'

export const Login = () => {
  // Hooks
  const dispatch = useDispatch()

  // State
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    error: ''
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  // Login
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      await loginUser({
        username: formData.username,
        password: formData.password
      })

      dispatch(renewAccessToken()).then(() => {
        dispatch(getUser())
      })
    } catch (error) {
      setFormData({
        ...formData,
        error: error.message,
      })
    }
  }

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formAuth} onSubmit={handleSubmit}>
        <h1>Authorization</h1>

        {formData.error && <ErrorMessage message={formData.error} />}

        {/* Username */}
        <input 
          className={styles.formAuth__input} 
          name='username'
          value={formData.username} 
          onChange={handleChange}
          type="text" 
          placeholder="Enter username" />

        {/* Password */}
        <input 
          className={styles.formAuth__input} 
          name='password'
          value={formData.password} 
          onChange={handleChange}
          type="password" 
          placeholder="Enter password" />

        <div className={styles.formAuth__buttonWrapper}>

          {/* Login */}
          <button type="submit">Login</button>

          {/* Go to the registration page */}
          <Link to='/auth/register'>No account?</Link>
        </div>
      </form>
    </div>
  )
}