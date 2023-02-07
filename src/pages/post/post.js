import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from 'html-react-parser'

import { CommentItem } from "../../components/commentItem/commentItem.js";
import { createComment, getPostComments } from "../../redux/features/comment/commentSlice.js";
import { removePost } from "../../redux/features/post/postSlice.js";
import axios from '../../utils/axios.js'
import styles from './post.module.css'

export const Post = () => {
  const params = useParams()
  const [post, setPost] = useState('')
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')
  const { comments } = useSelector(state => state.comment)
  const isAuth = useSelector((state) => Boolean(state.auth.token))

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id)).then(() => {
        navigate('/posts')
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handelSubmit = () => {
    try {
      const postId = params.id
      dispatch(createComment({ postId, comment, authorAvatar: user.avatar }))
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, params.id])

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${params.id}`)
      setPost(data)
    } catch (error) {
      console.log(error)
    }
  }, [params.id])

  const addOrRemoveUserLikePost = useCallback(async () => {
    try {
      const likes = post.likes
      const copyPost = {...post}

      if (post.likes.includes(user.username)) {

        await axios.delete(`/posts/likes/${params.id}`, {
          data: {
            username: user.username
          }
        })

        likes.splice(likes.indexOf(user.username), 1)

        setPost(Object.assign(copyPost, { likes: [...likes] }))
      } else {
        await axios.put(`/posts/likes/${params.id}`, {
          username: user.username
        })
  
        setPost(Object.assign(copyPost, { likes: [...copyPost.likes, user.username] }))
      }
    } catch (error) {
      console.log(error)
    }
  }, [params.id, user?.username, post])

  useEffect(() => {
    fetchPost()
    fetchComments()
  }, [fetchPost, fetchComments])

  const date = new Date(Date.parse(post.createdAt)).toLocaleDateString()

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
          post.image && <img className={styles.post__image} src={`http://localhost:3000/${post.image}`} alt="image post" />
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