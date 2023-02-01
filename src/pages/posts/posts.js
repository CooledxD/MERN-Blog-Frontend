import React, { useEffect, useState } from "react";

import { PostItem } from "../../components/postItem/postItem.js";
import axios from '../../utils/axios.js';
import styles from './posts.module.css'

export const Posts = () => {
  const [posts, setPosts] = useState([])

  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get('/posts/user')
      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUserPosts()
  }, [])

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