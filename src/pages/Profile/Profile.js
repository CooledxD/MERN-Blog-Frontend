import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Store
import { updateAvatar } from '../../redux/features/user/userSlice.js'

// Styles
import styles from './profile.module.css'

export const Profile = () => {
  // Hooks
  const dispatch = useDispatch()

  // Store
  const { user } = useSelector(state => state.user)

  // State
  const [userAvatar, setUserAvatar] = useState('')

  // Update avatar
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
    // Render when changing the avatar
    if (userAvatar) {
      sendHandler()
    }
  }, [userAvatar, sendHandler])

  return (
    <div className={styles.profile}>
      <div className={styles.avatarWrapper}>

        {/* Avatar */}
        {
          user?.avatar ?
            <img
              className={styles.avatar}
              src={`${process.env.HOST}/${user?.avatar}`}
              alt="avatar" /> :
            <img
              className={styles.avatar}
              src="../../assets/images/basicAvatar/basicAvatar.svg"
              alt="avatar" />
        }

        {/* Avatar change form */}
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

      {/* Username */}
      <span className={styles.username}>
        {user?.username}
      </span>

      {/* Number of posts */}
      <div>
        <span>Posts:</span>
        <span>{user?.posts.length}</span>
      </div>

      {/* Number of likes */}
      <div>
        <span>Likes:</span>
        <span>{user?.likes.length}</span>
      </div>
    </div>
  )
}