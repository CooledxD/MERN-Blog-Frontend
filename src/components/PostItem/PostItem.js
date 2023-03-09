import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import parse from 'html-react-parser'

// Styles
import styles from './postItem.module.css'

export const PostItem = ({ post }) => {
  // Date Conversion
  const date = new Date(Date.parse(post.createdAt)).toLocaleDateString()

  return (
    <Link to={`/post/${post._id}`}>
      <li>
        <article>

          {/* Image */}
          {
            post.image && <img className={styles.postItem__image} src={`${process.env.HOST}/${post.image}`} alt="image post" />
          }

          {/* Username and date */}
          <header className={styles.postItem__header}>
            <span>{ post.username }</span>
            <time>{ date }</time>
          </header>
          
          {/* Title */}
          <h3>{ post.title }</h3>

          {/* Text */}
          <div className={styles.postItem__text}>{ parse(post.text) }</div>

          <footer>

            {/* Likes */}
            <div>
              <img src="" alt="likes" /> <span>{post.likes?.length}</span>
            </div>

            {/* Views */}
            <div>
              <img src="" alt="views" /> <span>{ post.views }</span>
            </div>

            {/* Count comment */}
            <div>
              <img src="" alt="count comment" /> <span>{ post.comments?.length }</span>
            </div>
          </footer>
        </article>
      </li>
    </Link>
  )
}

PostItem.propTypes = {
  post: PropTypes.object
}