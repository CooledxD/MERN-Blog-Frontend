import React from "react";
import { NavLink } from "react-router-dom";

// Styles
import styles from './nav.module.css'

export const Nav = () => {
  return (
    <ul className={styles.nav}>

      {/* Main page */}
      <li>
        <NavLink
          to={'/'}
          className={({ isActive }) => isActive ? styles.isActiveLink : undefined}
          href=""
        >
          Main
        </NavLink>
      </li>

      {/* User posts page */}
      <li>
        <NavLink
          to={'/user/posts'}
          className={({ isActive }) => isActive ? styles.isActiveLink : undefined}
          href=""
        >
          My Posts
        </NavLink>
      </li>

      {/* Add post page */}
      <li>
        <NavLink
          to={'/post/add'}
          className={({ isActive }) => isActive ? styles.isActiveLink : undefined}
          href=""
        >
          Add a Post
        </NavLink>
      </li>
    </ul>
  )
}