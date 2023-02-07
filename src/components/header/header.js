import React from "react";
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/features/auth/authSlice.js";
import styles from './header.module.css'

export const Header = () => {
  const isAuth = useSelector((state) => Boolean(state.auth.token))
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
  }

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
                  className={({ isActive }) => isActive ? styles.activeStyles : undefined}
                  href="">Главная</NavLink>
              </li>
              <li>
                <NavLink
                  to={'/posts'}
                  className={({ isActive }) => isActive ? styles.activeStyles : undefined}
                  href="">Мои посты</NavLink>
              </li>
              <li>
                <NavLink
                  to={'/post/add'}
                  className={({ isActive }) => isActive ? styles.activeStyles : undefined}
                  href="">Добавить пост</NavLink>
              </li>
            </ul>
          )
        }
        {
          isAuth && (
            <Link to={'/profile'}>
              {
                user?.avatar ?
                  <img
                    className={styles.avatar}
                    src={`http://localhost:3000/${user?.avatar}`}
                    alt="avatar" /> :
                  <img
                    className={styles.avatar}
                    src="../../assets/images/basicAvatar/basicAvatar.svg"
                    alt="avatar" />
              }
            </Link>
          )
        }
        <div className={styles.navRight}>
          {
            isAuth ? (
              <Link to={'/login'} href="">
                <span className={styles.btnHeader} onClick={logoutHandler}>Выйти</span>
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