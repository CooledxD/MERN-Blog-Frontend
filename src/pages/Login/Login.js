import React from "react";
import { Link } from "react-router-dom";

import styles from './Login.module.css'

export const Login = () => {
  return (
    <div className={styles.formWrapper}>
      <form className={styles.formAuth} onSubmit={event => event.preventDefault()}>
        <h1>Авторизация</h1>
        <input className={styles.formAuth__input} type="text" placeholder="Username or email" />
        <input className={styles.formAuth__input} type="password" placeholder="Password" />
        <div className={styles.formAuth__buttonWrapper}>
          <button type="submit">Войти</button>
          <Link to='/register'>Нет аккаунта?</Link>
        </div>
      </form>
    </div>
  )
}