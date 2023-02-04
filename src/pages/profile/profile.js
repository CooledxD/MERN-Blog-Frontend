import React from "react";
import { useSelector } from "react-redux";

// import styles from './profile.module.css'

export const Profile = () => {
  const { user } = useSelector(state => state.auth)

  return (
    <div>
      {user.username}
    </div>
  )
}