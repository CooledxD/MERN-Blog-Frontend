import React, { useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';

// Pages
import { Home } from './pages/Home/Home.js'
import { Post } from './pages/Post/Post.js'
import { Posts } from './pages/Posts/Posts.js'
import { AddPost } from './pages/AddPost/AddPost.js'
import { Register } from './pages/Register/Register.js'
import { Login } from './pages/Login/Login.js'
import { EditPost } from './pages/EditPost/EditPost.js'
import { Profile } from './pages/Profile/Profile.js'
import { ErrorPage } from './pages/ErrorPage/ErrorPage.js'
import { AccountActivation } from './pages/AccountActivation/AccountActivation.js';

// Components
import { Layout } from './components/Layout/Layout.js';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute.js';
import { AuthenticationRoute } from './components/AuthenticationRoute/AuthenticationRoute.js'

// Store
import { renewAccessToken } from './redux/features/auth/authSlice.js';
import { getUser } from './redux/features/user/userSlice.js';
import { getUserPosts } from './redux/features/post/postSlice.js';

// Styles
import './index.css'

function App() {
  // Hooks
  const dispatch = useDispatch()

  // react-router-dom
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />} errorElement={<ErrorPage />} >
        <Route index element={<Home />} />
        <Route path='post/:postId' element={<Post />} />

        <Route element={<AuthenticationRoute />}>
          <Route path='auth/register' element={<Register />} />
          <Route path='auth/login' element={<Login />} />
          <Route path='auth/activate-account/:activationToken' element={<AccountActivation />} />
        </Route>

        <Route element={<PrivateRoute/>}>
          <Route path='post/add' element={<AddPost />} />
          <Route path='user/posts' element={<Posts />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='post/:postId/edit' element={<EditPost />} />
        </Route>
      </Route>
    )
  )

  useEffect(() => {
    dispatch(renewAccessToken()).then(() => {
      dispatch(getUser())
      dispatch(getUserPosts())
    })
  }, [dispatch])

  return (
    <RouterProvider router={router} />
  )
}

export default App