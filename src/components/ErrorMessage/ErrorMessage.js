import React from "react";
import PropTypes from 'prop-types';

// Styles
// import styles from './errorMessage.module.css'

export const ErrorMessage = ({ message }) => {
  return (
    <div>
      { message }
    </div>
  )
}

ErrorMessage.propTypes = {
  message: PropTypes.string
}