import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PopularPosts } from "../../components/popularPosts/popularPosts.js";
import { PostItem } from "../../components/postItem/postItem.js";
import { getAllPosts } from "../../redux/features/post/postSlice.js";

import styles from './home.module.css'

export const Home = () => {
  const dispatch = useDispatch()
  const { posts, popularPosts } = useSelector((state) => state.post)
  const [search, setSearch] = useState('')
  const filterSearch = posts.filter(post => {
    return post.title.toLowerCase().includes(search.toLowerCase())
  })

  useEffect(() => {
    dispatch(getAllPosts())
  }, [])

  if (!posts.length) {
    return (
      <p>Постов не существует.</p>
    )
  }

  return (
    <div className={styles.homeWrapper}>
      <ul className={styles.homePosts}>
        <form>
          <input
            onChange={event => setSearch(event.target.value)}
            type="text"
            placeholder="Search" />
        </form>
        {
          filterSearch.map((post, index) => (
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