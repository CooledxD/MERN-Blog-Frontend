import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PostItem } from "../../components/postItem/postItem.js";
import { getUserPosts } from "../../redux/features/post/postSlice.js";
import styles from './posts.module.css'

export const Posts = () => {
  const posts = useSelector(state => state.post.userPosts)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserPosts())
  }, [dispatch])

  if (!posts.length) {
    return (
      <p>Постов не существует.</p>
    )
  }

  return (
    <ul className={styles.homePosts}>
      {
        posts?.map((post, index) => (
          <PostItem key={index} post={post} />
        ))
      }
    </ul>
  )
}