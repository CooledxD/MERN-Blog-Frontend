import React, { useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { Home } from './pages/Home/Home.js'
import { Post } from './pages/Post/Post.js'
import { Posts } from './pages/Posts/Posts.js'
import { AddPost } from './pages/AddPost/AddPost.js'
import { Register } from './pages/Register/Register.js'
import { Login } from './pages/Login/Login.js'
import { EditPost } from './pages/EditPost/EditPost.js'

import { Layout } from './components/Layout/Layout.js';

import { getMe } from './redux/features/auth/authSlice.js';

import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='posts' element={<Posts />} />
      <Route path='post/add' element={<AddPost />} />
      <Route path='post/:id' element={<Post />} />
      <Route path='post/:id/edit' element={<EditPost />} />
      <Route path='register' element={<Register />} />
      <Route path='login' element={<Login />} />
    </Route>
  )
)

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [])

  return (
    <RouterProvider router={router} />
  )
}

export default App