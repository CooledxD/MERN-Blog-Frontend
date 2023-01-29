import React from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";

import { removeComment } from "../../redux/features/comment/commentSlice.js";

export const CommentItem = ({ cmt }) => {
  const date = new Date(Date.parse(cmt.createdAt)).toLocaleDateString()
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

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
        <img src="" alt="avatar" />
        <div>
          <header>
            <span>{cmt.username}</span><time>{date}</time>
          </header>
          <p>{cmt.comment}</p>
        </div>
      </article>
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