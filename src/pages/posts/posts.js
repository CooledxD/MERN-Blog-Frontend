import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import { PostItem } from "../../components/postItem/postItem.js";
import { ErrorMessage } from "../../components/errorMessage/errorMessage.js";

// Store
import { getUserPosts } from "../../redux/features/post/postSlice.js";

// Styles
import styles from './posts.module.css'

export const Posts = () => {
  // Hooks
  const dispatch = useDispatch()

  // Store
  const { userPosts } = useSelector(state => state.post)

  // State
  const [noPosts, setNoPosts] = useState('')

  useEffect(() => {
    dispatch(getUserPosts()).unwrap()
      .catch((error) => {
        setNoPosts(error.message)
      })
  }, [dispatch])

  if (noPosts) {
    return (
      <>
        <ErrorMessage message={noPosts} />
      </>
    )
  }

  return (
    <ul className={styles.homePosts}>
      {
        userPosts?.map((post, index) => (
          <PostItem key={index} post={post} />
        ))
      }
    </ul>
  )
}