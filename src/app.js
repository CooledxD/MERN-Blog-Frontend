import React, { useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { Home } from './pages/home/home.js'
import { Post } from './pages/post/post.js'
import { Posts } from './pages/posts/posts.js'
import { AddPost } from './pages/addPost/addPost.js'
import { Register } from './pages/register/register.js'
import { Login } from './pages/login/login.js'
import { EditPost } from './pages/editPost/editPost.js'
import { Profile } from './pages/profile/profile.js'
import { ErrorPage } from './pages/errorPage/errorPage.js'

import { Layout } from './components/layout/layout.js';

import { getMe } from './redux/features/auth/authSlice.js';

import './index.css'

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => Boolean(state.auth.token))
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} errorElement={<ErrorPage />} >
        <Route index element={<Home />} />
        <Route path='posts' element={isAuth ? <Posts /> : <Navigate to='/' />} />
        <Route path='post/add' element={isAuth ? <AddPost /> : <Navigate to='/' />} />
        <Route path='post/:id' element={<Post />} />
        <Route path='post/:id/edit' element={isAuth ? <EditPost /> : <Navigate to='/' />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='profile' element={isAuth ? <Profile /> : <Navigate to='/' />} />
      </Route>
    )
  )

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <RouterProvider router={router} />
  )
}

export default App