import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../../redux/features/auth/authSlice.js";
import styles from './login.module.css'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => Boolean(state.auth.token))
  const navigate = useNavigate()

  useEffect(() => {
    if(isAuth) navigate('/')
  }, [isAuth])

  const handleSubmit = () => {
    try {
      dispatch(loginUser({username, password}))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formAuth} onSubmit={event => event.preventDefault()}>
        <h1>Авторизация</h1>
        <input 
          className={styles.formAuth__input} 
          value={username} 
          onChange={(event) => setUsername(event.target.value)}
          type="text" 
          placeholder="Username" />
        <input 
          className={styles.formAuth__input} 
          value={password} 
          onChange={(event) => setPassword(event.target.value)}
          type="password" 
          placeholder="Password" />
        <div className={styles.formAuth__buttonWrapper}>
          <button onClick={handleSubmit} type="submit">Войти</button>
          <Link to='/register'>Нет аккаунта?</Link>
        </div>
      </form>
    </div>
  )
}