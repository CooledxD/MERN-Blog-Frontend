import React from "react";
import PropTypes from 'prop-types';

// Styles
import styles from './main.module.css'

export const Main = ({outlet}) => {
  return(
    <main className={styles.lmain}>
      {outlet}
    </main>
  )
}

Main.propTypes = {
  outlet: PropTypes.element
}