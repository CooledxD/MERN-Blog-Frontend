import React, { useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';

// Pages
import { Home } from './pages/home/home.js'
import { Post } from './pages/post/post.js'
import { Posts } from './pages/posts/posts.js'
import { AddPost } from './pages/addPost/addPost.js'
import { Register } from './pages/register/register.js'
import { Login } from './pages/login/login.js'
import { EditPost } from './pages/editPost/editPost.js'
import { Profile } from './pages/profile/profile.js'
import { ErrorPage } from './pages/errorPage/errorPage.js'
import { AccountActivation } from './pages/accountActivation/accountActivation.js';

// Components
import { Layout } from './components/layout/layout.js';
import { PrivateRoute } from './components/privateRoute/privateRoute.js';
import { AuthenticationRoute } from './components/authenticationRoute/authenticationRoute.js'

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