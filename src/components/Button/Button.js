import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// Styles
import styles from './button.module.css'

export const Button = ({ to = undefined, title, handler = undefined }) => {
  return (
    <>
      {
        to ?
          <Link
            to={'/auth/login'}
            className={styles.btn}
            onClick={handler}
          >
            {title}
          </Link> :
          <button 
            className={styles.btn} 
            onClick={handler}
          >
            {title}
          </button>
      }
    </>
  )
}

Button.propTypes = {
  to: PropTypes.string,
  title: PropTypes.string,
  handler: PropTypes.func
}