import React from "react";
import { Link, NavLink } from 'react-router-dom'

import styles from './Header.module.css'

export const Header = () => {
  const activeStyles = {
    fontSize: '24px'
  }

  const isAuth = false

  return (
    <header>
      <nav className={styles.navbar}>
        <NavLink to={'/'} className="siteName" href="">hubblog</NavLink>
        {
          isAuth && (
            <ul className={styles.nav}>
              <li>
                <NavLink
                  to={'/'}
                  style={({ isActive }) => isActive ? activeStyles : undefined}
                  href="">Главная</NavLink>
              </li>
              <li>
                <NavLink
                  to={'/posts'}
                  style={({ isActive }) => isActive ? activeStyles : undefined}
                  href="">Мои посты</NavLink>
              </li>
              <li>
                <NavLink
                  to={'/post/add'}
                  style={({ isActive }) => isActive ? activeStyles : undefined}
                  href="">Добавить пост</NavLink>
              </li>
            </ul>
          )
        }
        <div className={styles.navRight}>
          {
            isAuth ? (
              <Link to={'/login'} href="">
                <span className={styles.btnHeader}>Выйти</span>
              </Link>
            ) : (
              <Link to={'/login'} href="">
                <span className={styles.btnHeader}>Войти</span>
              </Link>
            )
          }
        </div>
      </nav>
    </header>
  )
}