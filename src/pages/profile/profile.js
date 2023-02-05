import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateAvatar } from '../../redux/features/auth/authSlice.js'
import styles from './profile.module.css'

export const Profile = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [userAvatar, setUserAvatar] = useState('')

  const sendHandler = useCallback(() => {
    try {
      const newAvatar = new FormData()

      newAvatar.append('image', userAvatar)

      dispatch(updateAvatar(newAvatar))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, userAvatar])

  useEffect(() => {
    if (userAvatar) {
      sendHandler()
    }
  }, [userAvatar, sendHandler])

  return (
    <div className={styles.profile}>
      <div className={styles.avatarWrapper}>
        {
          user?.avatar ?
            <img
              className={styles.avatar}
              src={`http://localhost:3000/${user?.avatar}`}
              alt="avatar" /> :
            <img
              className={styles.avatar}
              src="../../assets/images/basicAvatar/basicAvatar.svg"
              alt="avatar" />
        }
        <form onSubmit={(event) => event.preventDefault()}>
          <label className={styles.button}>
            Change avatar
            <input onChange={event => {
                setUserAvatar(event.target.files[0])
              }} 
              type="file" 
              hidden />
          </label>
        </form>
      </div>
      <span className={styles.username}>
        {user?.username}
      </span>
      <div>
        <span>Posts:</span>
        <span>{user?.posts.length}</span>
      </div>
      <div>
        <span>Likes:</span>
        <span></span>
      </div>
    </div>
  )
}