import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import { SuccessMessage } from "../../components/successMessage/successMessage.js";
import { ErrorMessage } from "../../components/errorMessage/errorMessage.js";

// Utils
import { activateAccount } from "../../utils/api.js";

export const AccountActivation = () => {
  const { activationToken } = useParams()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const activate = async () => {
      try {
        const data = await activateAccount({activationToken})
  
        setSuccess(data.message)
      } catch (error) {
        console.log(error)
  
        setError(error)
      }
    }

    activate()
  }, [activationToken])

  return (
    <div>
      { success && <SuccessMessage message={success} /> }
      { error && <ErrorMessage message={error} /> }
    </div>
  )
}