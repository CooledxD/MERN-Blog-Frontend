import React, { useState } from "react";
import { Link } from "react-router-dom";

// Utils
import { registerUser } from "../../utils/api.js";

// Components
import { SuccessMessage } from "../../components/successMessage/successMessage.js";
import { ErrorMessage } from '../../components/errorMessage/errorMessage.js'

// Styles
import styles from './register.module.css'

export const Register = () => {
  // State
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    success: '',
    error: ''
  })

  const handleChange = (event) => {
    setFormData({ 
      ...formData, 
      [event.target.name]: event.target.value 
    })
  }

  // Registration
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()

      // if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      //   return setFormData({
      //     ...formData,
      //     error: 'Please fill in all fields',
      //     success: ''
      //   })
      // }

      const data = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      })

      setFormData({
        ...formData,
        error: '',
        success: data.message
      })
    } catch (error) {
      setFormData({
        ...formData,
        error: error.message,
        success: ''
      })
    }
  }

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formAuth} onSubmit={handleSubmit}>
        <h1>Registration</h1>

        {formData.success && <SuccessMessage message={formData.success} />}
        {formData.error && <ErrorMessage message={formData.error} />}

        {/* Username */}
        <input 
          className={styles.formAuth__input} 
          value={formData.username} 
          name='username'
          onChange={handleChange}
          type="text" 
          placeholder="Enter username" 
        />

        {/* Email */}
        <input 
          className={styles.formAuth__input} 
          name="email"
          value={formData.email} 
          onChange={handleChange}
          type="email" 
          placeholder="Enter email address" 
        />

        {/* Password */}
        <input 
          className={styles.formAuth__input} 
          name='password'
          value={formData.password} 
          onChange={handleChange}
          type="password" 
          placeholder="Enter password" 
        />

        {/* Confirm password */}
        <input 
          className={styles.formAuth__input} 
          name='confirmPassword'
          value={formData.confirmPassword} 
          onChange={handleChange}
          type="password" 
          placeholder="Enter password again" 
        />

        <div className={styles.formAuth__buttonWrapper}>
          {/* Confirmation of the entered data */}
          <button type="submit">Confirm</button>

          {/* Going to the login page */}
          <Link to='/auth/login'>Already registered?</Link>
        </div>
      </form>
    </div>
  )
}