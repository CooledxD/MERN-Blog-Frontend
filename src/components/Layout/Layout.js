import React from "react";
import { Outlet } from "react-router-dom";

import styles from './layout.module.css'
import { Header } from '../header/header.js'

export const Layout = () => {
  return (
    <div className={ styles.container }>
      <Header />
      <main style={{paddingTop: 12}}>
        <Outlet />
      </main>
    </div>
  )
}