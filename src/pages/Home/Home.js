import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import { PopularPosts } from "../../components/PopularPosts/PopularPosts.js";
import { PostItem } from "../../components/PostItem/PostItem.js";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage.js";

// Store
import { getAllPosts } from "../../redux/features/post/postSlice.js";

// Styles
import styles from './home.module.css'

export const Home = () => {
  // Hooks
  const dispatch = useDispatch()

  // Store
  const { posts, popularPosts } = useSelector((state) => state.post)

  // State
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')

  // Search
  const filterSearch = posts.filter(post => {
    return post.title?.toLowerCase().includes(search.toLowerCase())
  })

  useEffect(() => {
    dispatch(getAllPosts()).unwrap()
      .then(() => {
        setMessage('')
      })
      .catch((error) => {
        setMessage(error.message)
      })
  }, [dispatch])

  return (
    <div className={styles.homeWrapper}>

      {message && <ErrorMessage message={message} />}

      <ul className={styles.homePosts}>
        {/* Search */}
        <form>
          <input
            onChange={event => setSearch(event.target.value)}
            type="text"
            placeholder="Search" />
        </form>

        {/* Posts */}
        {
          filterSearch.map((post, index) => (
            <PostItem key={index} post={post} />
          ))
        }
      </ul>

      {/* Popular posts */}
      <aside>
        <h2>Popular</h2>
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