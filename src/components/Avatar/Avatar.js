import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// Styles
import styles from './avatar.module.css'

export const Avatar = ({url, to = undefined}) => {
  return (
    <Link to={to}>
      {
        url ?
          <img
            className={styles.avatar}
            src={`${process.env.HOST}/${url}`}
            alt="avatar" 
          /> :
          <img
            className={styles.avatar}
            src="../../assets/images/basicAvatar/basicAvatar.svg"
            alt="avatar" 
          />
      }
    </Link>
  )
}

Avatar.propTypes = {
  url: PropTypes.string,
  to: PropTypes.string
}