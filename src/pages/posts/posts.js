import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import { PostItem } from "../../components/postItem/postItem.js";

// Store
import { getUserPosts } from "../../redux/features/post/postSlice.js";

// Styles
import styles from './posts.module.css'

export const Posts = () => {
  // Hooks
  const dispatch = useDispatch()

  // Store
  const { userPosts } = useSelector(state => state.post)

  useEffect(() => {
    dispatch(getUserPosts())
  }, [dispatch])

  if (!userPosts.length) {
    return (
      <p>Постов не существует.</p>
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