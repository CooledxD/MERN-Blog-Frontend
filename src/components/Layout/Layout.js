import React from "react";
import { Outlet } from "react-router-dom";

// Components
import { Header } from '../header/header.js'

// Styles
import styles from './layout.module.css'

export const Layout = () => {
  return (
    <div className={ styles.lContainer }>
      <Header />
      <main style={{paddingTop: 12}}>
        <Outlet />
      </main>
    </div>
  )
}