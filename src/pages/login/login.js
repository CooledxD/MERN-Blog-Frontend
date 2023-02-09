import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Store
import { loginUser } from "../../redux/features/auth/authSlice.js";
import { getUser } from "../../redux/features/user/userSlice.js";

// Styles
import styles from './login.module.css'

export const Login = () => {
  // Hooks
  const dispatch = useDispatch()

  // State
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Login
  const handleSubmit = () => {
    try {
      dispatch(loginUser({username, password})).
        then(() => {
          dispatch(getUser())
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formAuth} onSubmit={event => event.preventDefault()}>
        <h1>Авторизация</h1>

        {/* Username */}
        <input 
          className={styles.formAuth__input} 
          value={username} 
          onChange={(event) => setUsername(event.target.value)}
          type="text" 
          placeholder="Username" />

        {/* Password */}
        <input 
          className={styles.formAuth__input} 
          value={password} 
          onChange={(event) => setPassword(event.target.value)}
          type="password" 
          placeholder="Password" />

        <div className={styles.formAuth__buttonWrapper}>

          {/* Login */}
          <button onClick={handleSubmit} type="submit">Войти</button>

          {/* Go to the registration page */}
          <Link to='/register'>Нет аккаунта?</Link>
        </div>
      </form>
    </div>
  )
}