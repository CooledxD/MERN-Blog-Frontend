import React from "react";
import PropTypes from 'prop-types';

// Styles
// import styles from './successMessage.module.css'

export const SuccessMessage = ({ message }) => {
  return (
    <div>
      { message }
    </div>
  )
}

SuccessMessage.propTypes = {
  message: PropTypes.string
}