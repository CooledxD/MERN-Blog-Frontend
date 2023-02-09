import React from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

// Store
import { removeComment } from "../../redux/features/comment/commentSlice.js";

// Styles
import styles from './commentItem.module.css'

export const CommentItem = ({ cmt }) => {
  // Hooks
  const dispatch = useDispatch()

  // Store
  const { user } = useSelector(state => state.user)

  // Date Conversion
  const date = new Date(Date.parse(cmt.createdAt)).toLocaleDateString()

  // Remove comment
  const removeCommentHandler = () => {
    try {
      dispatch(removeComment({
        commentId: cmt._id,
        postId: cmt.post
      }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <li>
      <article>

        {/* Avatar */}
        {
          cmt.authorAvatar ? 
            <img 
              className={styles.avatar} 
              src={`${process.env.HOST}/${cmt.authorAvatar}`} 
              alt="avatar" /> : 
            <img 
              className={styles.avatar} 
              src="../../assets/images/basicAvatar/basicAvatar.svg" 
              alt="avatar" />
        }

        <div>
          <header>

            {/* Username */}
            <span>{cmt.username}</span><time>{date}</time>
          </header>

          {/* Text */}
          <p>{cmt.comment}</p>
        </div>
      </article>

      {/* Remove comment */}
      {
        user?.username === cmt.username && (
          <button onClick={removeCommentHandler}>
            <img src="" alt="remove" /> <span>remove</span>
          </button>
        )
      }
    </li>
  )
}

CommentItem.propTypes = {
  cmt: PropTypes.object,
}