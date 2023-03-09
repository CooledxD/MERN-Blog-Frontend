import React from "react";
import { NavLink } from "react-router-dom";

// Styles
import styles from './logo.module.css'

export const Logo = () => {
  return(
    <NavLink 
        to={'/'} 
        className={styles.logo} 
        href=""
      >
        <span className={styles.logo__inner}>Hub</span>Blog
      </NavLink>
  )
}