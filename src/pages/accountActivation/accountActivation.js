import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import { SuccessMessage } from "../../components/SuccessMessage/SuccessMessage.js";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage.js";

// Utils
import { activateAccount } from "../../utils/api.js";

export const AccountActivation = () => {
  const { activationToken } = useParams()
  const [message, setMessage] = useState({
    success: '',
    error: ''
  })

  useEffect(() => {
    const activate = async () => {
      try {
        const data = await activateAccount({activationToken})
  
        setMessage({
          ...message,
          success: data.message
        })
      } catch (error) {
        setMessage({
          ...message,
          error: error.message
        })
      }
    }

    activate()
    /* eslint-disable-next-line */
  }, [])

  return (
    <div>
      { message.success && <SuccessMessage message={message.success} /> }
      { message.error && <ErrorMessage message={message.error} /> }
    </div>
  )
}