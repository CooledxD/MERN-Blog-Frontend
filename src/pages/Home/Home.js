import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PopularPosts } from "../../components/PopularPosts/PopularPosts.js";
import { PostItem } from "../../components/PostItem/PostItem.js";
import { getAllPosts } from "../../redux/features/post/postSlice.js";

import styles from './Home.module.css'

export const Home = () => {
  const dispatch = useDispatch()
  const { posts, popularPosts } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [])

  if(!posts.length) {
    return (
      <p>Постов не существует.</p>
    )
  }

  return (
    <div className={styles.homeWrapper}>
      <ul className={styles.homePosts}>
        {
          posts.map((post, index) => (
            <PostItem key={index} post={post} />
          ))
        }
      </ul>
      <aside>
        <h2>Популярное</h2>
        <ul>
          {
            popularPosts.map((post, index) => (
              <PopularPosts key={index} post={post} />
            ))
          }
        </ul>
      </aside>
    </div>
  )
}