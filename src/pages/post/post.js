import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from 'html-react-parser'

// Component
import { CommentItem } from "../../components/commentItem/commentItem.js";
import { ErrorMessage } from '../../components/errorMessage/errorMessage.js'

// State
import { createComment, getPostComments, removeComments } from "../../redux/features/comment/commentSlice.js";
import { removePost } from "../../redux/features/post/postSlice.js";
import { addLikeUserState, removeLikeUserState, removePostUserState } from "../../redux/features/user/userSlice.js";

// Utils
import axios from '../../utils/axios.js'
import { validationCreateComment } from '../../utils/validation/validationCreateComment.js'

// Styles
import styles from './post.module.css'

export const Post = () => {
  // Hooks
  const { postId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // State
  const [post, setPost] = useState('')
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState('')
  const [noPost, setNoPost] = useState('')

  // Store
  const { user } = useSelector(state => state.user)
  const { comments } = useSelector(state => state.comment)
  const isAuth = useSelector((state) => Boolean(state.auth.token))

  // Date Conversion
  const date = new Date(Date.parse(post.createdAt)).toLocaleDateString()

  // Remove post
  const removePostHandler = () => {
    try {
      dispatch(removePost(postId)).then(() => {
        dispatch(removePostUserState(postId))
        dispatch(removeLikeUserState(postId))
        dispatch(removeComments())
        navigate('/user/posts')
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  // Create comment
  const handelSubmit = async () => {
    try {
      await validationCreateComment(comment)

      dispatch(createComment({ postId, comment, authorAvatar: user.avatar })).unwrap()
        .then(() => {
          setComment('')
          setMessage('')
        })
        .catch((error) => {
          setMessage(error.message)
        })
    } catch (error) {
      setMessage(error.message)
    }
  }

  // Getting comments on a post
  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(postId))
    } catch (error) {
      console.log(error.message)
    }
  }, [dispatch, postId])

  // Getting post
  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/posts/${postId}`)

      setPost(data)
    } catch (error) {
      setNoPost(error.response.data.message)
    }
  }, [postId])

  // Installing and deleting likes to a post
  const addOrRemoveUserLikePost = useCallback(async () => {
    try {
      const likes = post.likes
      const copyPost = { ...post }

      // Deleting a like
      if (post.likes.includes(user.username)) {

        await axios.delete(`/posts/${postId}/likes`, {
          data: {
            username: user.username
          }
        })

        dispatch(removeLikeUserState(postId))

        likes.splice(likes.indexOf(user.username), 1)

        setPost(Object.assign(copyPost, { likes: [...likes] }))
      } else {
        // Installing a like
        await axios.put(`/posts/${postId}/likes`, {
          username: user.username
        })

        dispatch(addLikeUserState(postId))

        setPost(Object.assign(copyPost, { likes: [...copyPost.likes, user.username] }))
      }
    } catch (error) {
      console.log(error)
    }
  }, [postId, user?.username, post, dispatch])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  if (noPost) {
    return (
      <>
        <ErrorMessage message={noPost} />
      </>
    )
  }

  return (
    <div className={styles.postWrapper}>
      <article>
        {/* Title */}
        <h1>{post.title}</h1>

        {/* Info */}
        <div>
          <span>{post.username}</span>
          <time>{date}</time>
        </div>

        {/* image */}
        {
          post.image && <img className={styles.post__image} src={`${process.env.HOST}/${post.image}`} alt="image post" />
        }

        {/* Text */}
        <div>
          {parse(String(post.text))}
        </div>
        <footer>

          {/* Likes */}
          <div>
            <button onClick={isAuth ? addOrRemoveUserLikePost : undefined}>
              <img src="" alt="likes" /> <span>{post.likes?.length}</span>
            </button>
          </div>

          {/* Views */}
          <div>
            <img src="" alt="views" /> <span>{post.views}</span>
          </div>

          {/* Count comments */}
          <div>
            <img src="" alt="count comment" /> <span>{comments.length}</span>
          </div>

          {/* Button remove and edit */}
          {
            user?.username === post.username && (
              <>
                <button onClick={removePostHandler}>
                  <img src="" alt="remove" /> <span>remove</span>
                </button>
                <Link to={`/post/${postId}/edit`}>
                  <img src="" alt="edit" /> <span>edit</span>
                </Link>
              </>
            )
          }
        </footer>
      </article>
      <aside>

        {/* Message */}
        {message && <ErrorMessage message={message} />}

        {/* Create comment */}
        {isAuth &&
          <form onSubmit={event => event.preventDefault()}>
            <input
              value={comment}
              onChange={event => setComment(event.target.value)}
              type="text"
              placeholder="Comment" />
            <button onClick={handelSubmit} type="submit">Send</button>
          </form>
        }

        {/* Comments */}
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