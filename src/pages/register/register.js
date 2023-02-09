import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Store
import { registerUser } from "../../redux/features/auth/authSlice.js";
import { getUser } from "../../redux/features/user/userSlice.js";

// Styles
import styles from './register.module.css'

export const Register = () => {
  // Hooks
  const dispatch = useDispatch()

  // State
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  // Registration
  const handleSubmit = () => {
    try {
      dispatch(registerUser({username, password, email})).
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
        <h1>Регистрация</h1>

        {/* Username */}
        <input 
          className={styles.formAuth__input} 
          value={username} 
          onChange={(event) => setUsername(event.target.value)}
          type="text" 
          placeholder="Username" />

        {/* Email */}
        <input 
          className={styles.formAuth__input} 
          value={email} 
          onChange={(event) => setEmail(event.target.value)}
          type="email" 
          placeholder="Email" />
        
        {/* Password */}
        <input 
          className={styles.formAuth__input} 
          value={password} 
          onChange={(event) => setPassword(event.target.value)}
          type="password" 
          placeholder="Password" />

        <div className={styles.formAuth__buttonWrapper}>
          {/* Confirmation of the entered data */}
          <button onClick={handleSubmit} type="submit">Подтвердить</button>

          {/* Going to the login page */}
          <Link to='/login'>Уже зарегестрированы?</Link>
        </div>
      </form>
    </div>
  )
}