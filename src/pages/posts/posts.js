import React from "react";
import { useSelector } from "react-redux";

// Components
import { PostItem } from "../../components/PostItem/PostItem.js";

// Styles
import styles from './posts.module.css'

export const Posts = () => {
  // Store
  const { userPosts } = useSelector(state => state.post)

  return (
    <>
      {!userPosts.length && <p>No posts</p>}

      <ul className={styles.homePosts}>
        {
          userPosts?.map((post, index) => (
            <PostItem key={index} post={post} />
          ))
        }
      </ul>
    </>
  )
}