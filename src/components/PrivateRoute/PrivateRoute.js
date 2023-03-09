import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { renewAccessToken } from "../../store/features/auth/authSlice.js";

export const PrivateRoute = () => {
  const isAuth = sessionStorage.getItem('isAuth')
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch(renewAccessToken())
  }, [dispatch, location])

  return isAuth ? <Outlet/> : <Navigate to='/' />
}