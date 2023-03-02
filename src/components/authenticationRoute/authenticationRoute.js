import React from "react";
import { Navigate, Outlet } from 'react-router-dom'

export const AuthenticationRoute = () => {
  const isAuth = sessionStorage.getItem('isAuth')

  return isAuth ? <Navigate to='/' /> : <Outlet/>
}