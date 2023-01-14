import React from "react";
import { Link } from "react-router-dom";

import styles from './Register.module.css'

export const Register = () => {
  return (
    <div className={styles.formWrapper}>
      <form className={styles.formAuth} onSubmit={event => event.preventDefault()}>
        <h1>Регистрация</h1>
        <input className={styles.formAuth__input} type="text" placeholder="Username" />
        <input className={styles.formAuth__input} type="email" placeholder="Email" />
        <input className={styles.formAuth__input} type="password" placeholder="Password" />
        <div className={styles.formAuth__buttonWrapper}>
          <button type="submit">Подтвердить</button>
          <Link to='/login'>Уже зарегестрированы?</Link>
        </div>
      </form>
    </div>
  )
}