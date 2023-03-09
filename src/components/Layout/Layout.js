import React from "react";
import { Outlet } from "react-router-dom";

// Components
import { Header } from '../Header/Header.js'
import { Main } from "../Main/Main.js";

// Styles
import styles from './layout.module.css'

export const Layout = () => {
  return (
    <div className={ styles.lContainer }>
      <Header />
      <Main outlet={<Outlet />} />
    </div>
  )
}