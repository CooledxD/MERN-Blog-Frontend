import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { registerUser } from "../../redux/features/auth/authSlice.js";
import { getUser } from "../../redux/features/user/userSlice.js";

import styles from './register.module.css'

export const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()

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
        <input 
          className={styles.formAuth__input} 
          value={username} 
          onChange={(event) => setUsername(event.target.value)}
          type="text" 
          placeholder="Username" />
        <input 
          className={styles.formAuth__input} 
          value={email} 
          onChange={(event) => setEmail(event.target.value)}
          type="email" 
          placeholder="Email" />
        <input 
          className={styles.formAuth__input} 
          value={password} 
          onChange={(event) => setPassword(event.target.value)}
          type="password" 
          placeholder="Password" />
        <div className={styles.formAuth__buttonWrapper}>
          <button onClick={handleSubmit} type="submit">Подтвердить</button>
          <Link to='/login'>Уже зарегестрированы?</Link>
        </div>
      </form>
    </div>
  )
}