import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Store
import { logoutAuthState } from "../../redux/features/auth/authSlice.js";
import { logoutUserState } from "../../redux/features/user/userSlice.js";
import { logoutPostState } from "../../redux/features/post/postSlice.js";

// Components
import { Avatar } from "../Avatar/Avatar.js";
import { Nav } from "../Nav/Nav.js";
import { Logo } from "../Logo/Logo.js";
import { Button } from "../Button/Button.js";

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
    dispatch(logoutAuthState())
    dispatch(logoutUserState())
    dispatch(logoutPostState())
  }

  return (
    <header className={styles.lheader}>
      {/* Logo */}
      <Logo />

      {/* Nav */}
      {
        isAuth && (
          <Nav />
        )
      }

      {/* Nav rigth */}
      <div className={styles.header__wrap}>

        {/* Profile page */}
        {
          isAuth && (
            <Avatar 
              url={user?.avatar} 
              to={'/user/profile'} 
            />
          )
        }

        {/* Login/Logout */}
        <Button 
          to={'auth/login'}
          handler={isAuth ? logoutHandler : undefined} 
          title={isAuth ? 'Logout' : 'Login'} 
        />
      </div>
    </header>
  )
}