import React, { useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';

import { Home } from './pages/home/home.js'
import { Post } from './pages/post/post.js'
import { Posts } from './pages/posts/posts.js'
import { AddPost } from './pages/addPost/addPost.js'
import { Register } from './pages/register/register.js'
import { Login } from './pages/login/login.js'
import { EditPost } from './pages/editPost/editPost.js'
import { Profile } from './pages/profile/profile.js'

import { Layout } from './components/layout/layout.js';

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
      <Route path='profile' element={<Profile />} />
    </Route>
  )
)

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <RouterProvider router={router} />
  )
}

export default App