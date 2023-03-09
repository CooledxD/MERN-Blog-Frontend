import React from "react";
import { useNavigate, useRouteError } from "react-router-dom";

// Styles
import styles from './errorPage.module.css'

export const ErrorPage = () => {
  // Hooks
  const error = useRouteError()
  const navigate = useNavigate()

  return (
    <div className={styles.errorPage}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>

      {/* Error text */}
      <p>
        <i>{error.statusText || error.message}</i>
      </p>

      {/* Go to the main page */}
      <button type="button" onClick={() => navigate('/')}>
        On main page
      </button>
    </div>
  )
}