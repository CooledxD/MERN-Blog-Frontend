import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { removePost } from "../../redux/features/post/postSlice.js";
import axios from '../../utils/axios.js'
import styles from './Post.module.css'

export const Post = () => {
  const params = useParams()
  const [post, setPost] = useState('')
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id))
      navigate('/posts')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/posts/${params.id}`)
      setPost(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [params.id])

  const date = new Date(Date.parse(post.createdAt)).toLocaleDateString()

  console.log(params.id)

  return (
    <div className={styles.postWrapper}>
      <article>
        <h1>{post.title}</h1>
        <div>
          <span>{post.username}</span>
          <time>{date}</time>
        </div>
        {
          post.image && <img className={styles.post__image} src={`http://localhost:3000/${post.image}`} alt="image post" />
        }
        <p>{post.text}</p>
        <footer>
          <div>
            <img src="" alt="views" /> <span>{post.views}</span>
          </div>
          <div>
            <img src="" alt="count comment" /> <span>{post.comments?.length}</span>
          </div>
          {
            user?.username === post.username && (
              <>
                <button onClick={removePostHandler}>
                  <img src="" alt="remove" /> <span>remove</span>
                </button>
                <Link to={`/post/${params.id}/edit`}>
                  <img src="" alt="edit" /> <span>edit</span>
                </Link>
              </>
            )
          }
        </footer>
      </article>
      <aside>
        Comments
      </aside>
    </div>
  )
}