import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import styles from './PostItem.module.css'

export const PostItem = ({ post }) => {
  const date = new Date(Date.parse(post.createdAt)).toLocaleDateString()

  return (
    <Link to={`/post/${post._id}`}>
      <li>
        <article>
          {
            post.image && <img className={styles.postItem__image} src={`http://localhost:3000/${post.image}`} alt="image post" />
          }
          <header className={styles.postItem__header}>
            <span>{ post.username }</span>
            <time>{ date }</time>
          </header>
          <h3>{ post.title }</h3>
          <p className={styles.postItem__text}>{ post.text }</p>
          <footer>
            <button>
              <img src="" alt="views" /> <span>{ post.views }</span>
            </button>
            <button>
              <img src="" alt="count comment" /> <span>{ post.comments?.length }</span>
            </button>
          </footer>
        </article>
      </li>
    </Link>
  )
}

PostItem.propTypes = {
  post: PropTypes.object
}