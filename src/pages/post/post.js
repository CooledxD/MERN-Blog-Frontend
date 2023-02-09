import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from 'html-react-parser'

import { CommentItem } from "../../components/commentItem/commentItem.js";
import { createComment, getPostComments } from "../../redux/features/comment/commentSlice.js";
import { removePost } from "../../redux/features/post/postSlice.js";
import axios from '../../utils/axios.js'
import { addLikeUserState, removeLikeUserState, removePostUserState } from "../../redux/features/user/userSlice.js";

// Styles
import styles from './post.module.css'

export const Post = () => {
  // Hooks
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // State
  const [post, setPost] = useState('')
  const [comment, setComment] = useState('')

  // Store
  const { user } = useSelector(state => state.user)
  const { comments } = useSelector(state => state.comment)
  const isAuth = useSelector((state) => Boolean(state.auth.token))

  // Date Conversion
  const date = new Date(Date.parse(post.createdAt)).toLocaleDateString()

  // Remove post
  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id)).then(() => {
        dispatch(removePostUserState(params.id))
        dispatch(removeLikeUserState(params.id))
        navigate('/posts')
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Create post
  const handelSubmit = () => {
    try {
      const postId = params.id

      dispatch(createComment({ postId, comment, authorAvatar: user.avatar }))
      
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }

  // Getting comments on a post
  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, params.id])

  // Getting post
  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${params.id}`)

      setPost(data)
    } catch (error) {
      console.log(error)
    }
  }, [params.id])

  // Installing and deleting likes to a post
  const addOrRemoveUserLikePost = useCallback(async () => {
    try {
      const likes = post.likes
      const copyPost = {...post}

      // Deleting a like
      if (post.likes.includes(user.username)) {

        await axios.delete(`/posts/likes/${params.id}`, {
          data: {
            username: user.username
          }
        })

        dispatch(removeLikeUserState(params.id))

        likes.splice(likes.indexOf(user.username), 1)

        setPost(Object.assign(copyPost, { likes: [...likes] }))
      } else {
      // Installing a like
        await axios.put(`/posts/likes/${params.id}`, {
          username: user.username
        })

        dispatch(addLikeUserState(params.id))
  
        setPost(Object.assign(copyPost, { likes: [...copyPost.likes, user.username] }))
      }
    } catch (error) {
      console.log(error)
    }
  }, [params.id, user?.username, post, dispatch])

  useEffect(() => {
    fetchPost()

    fetchComments()
  }, [fetchPost, fetchComments])

  if (!post) {
    return (
      <p>Такого поста не существует.</p>
    )
  }

  return (
    <div className={styles.postWrapper}>
      <article>
        <h1>{post.title}</h1>
        <div>
          <span>{post.username}</span>
          <time>{date}</time>
        </div>
        {
          post.image && <img className={styles.post__image} src={`${process.env.HOST}/${post.image}`} alt="image post" />
        }
        <div>
          { parse(String(post.text)) }
        </div>
        <footer>
          <div>
            <button onClick={ isAuth ? addOrRemoveUserLikePost: undefined}>
              <img src="" alt="likes" /> <span>{post.likes?.length}</span>
            </button>
          </div>
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
        <form onSubmit={event => event.preventDefault()}>
          <input 
            value={comment} 
            onChange={event => setComment(event.target.value)} 
            type="text" 
            placeholder="Comment" />
          <button onClick={handelSubmit} type="submit">Отправить</button>
        </form>
        <ul>
          {
            comments?.map((cmt) => (
              <CommentItem key={cmt._id} cmt={cmt} />
            ))
          }
        </ul>
      </aside>
    </div>
  )
}