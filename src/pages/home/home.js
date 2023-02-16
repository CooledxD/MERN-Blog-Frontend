import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import { PopularPosts } from "../../components/popularPosts/popularPosts.js";
import { PostItem } from "../../components/postItem/postItem.js";

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

  // Search
  const filterSearch = posts.filter(post => {
    return post.title?.toLowerCase().includes(search.toLowerCase())
  })

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  if (!posts.length) {
    return (
      <p>There are no posts</p>
    )
  }

  return (
    <div className={styles.homeWrapper}>
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