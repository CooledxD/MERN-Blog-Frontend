import React from "react";
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

// Store
import { logoutUser } from "../../redux/features/auth/authSlice.js";
import { logout } from "../../redux/features/user/userSlice.js";
import { logoutUserPost } from "../../redux/features/post/postSlice.js";

// Styles
import styles from './header.module.css'

export const Header = () => {
  // Hooks
  const dispatch = useDispatch()

  // Store
  const isAuth = useSelector((state) => Boolean(state.auth.token))
  const { user } = useSelector(state => state.user)

  // Logout
  const logoutHandler = () => {
    dispatch(logoutUser())
    dispatch(logout())
    dispatch(logoutUserPost())
  }

  return (
    <header>
      <nav className={styles.navbar}>

        {/* Logo */}
        <NavLink to={'/'} className="siteName" href="">hubblog</NavLink>

        {/* Menu */}
        {
          isAuth && (
            <ul className={styles.nav}>

              {/* Main page */}
              <li>
                <NavLink
                  to={'/'}
                  className={({ isActive }) => isActive ? styles.activeStyles : undefined}
                  href="">Главная</NavLink>
              </li>

              {/* User posts page */}
              <li>
                <NavLink
                  to={'/posts'}
                  className={({ isActive }) => isActive ? styles.activeStyles : undefined}
                  href="">Мои посты</NavLink>
              </li>

              {/* Add post page */}
              <li>
                <NavLink
                  to={'/post/add'}
                  className={({ isActive }) => isActive ? styles.activeStyles : undefined}
                  href="">Добавить пост</NavLink>
              </li>
            </ul>
          )
        }

        {/* Profile page */}
        {
          isAuth && (
            <Link to={'/profile'}>

              {/* Avatar */}
              {
                user?.avatar ?
                  <img
                    className={styles.avatar}
                    src={`${process.env.HOST}/${user?.avatar}`}
                    alt="avatar" /> :
                  <img
                    className={styles.avatar}
                    src="../../assets/images/basicAvatar/basicAvatar.svg"
                    alt="avatar" />
              }
            </Link>
          )
        }

        {/* Login and logout */}
        <div className={styles.navRight}>
          <Link to={'auth/login'} href="">
            <span className={styles.btnHeader} onClick={isAuth ? logoutHandler : undefined}>{ isAuth ? 'Logout' : 'Login' }</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}