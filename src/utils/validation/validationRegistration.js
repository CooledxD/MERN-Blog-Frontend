import Joi from "joi";
import tlds from '../../../node_modules/@sideway/address/lib/tlds.js'

// Joi schema
const registrationSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .pattern(/^[a-zA-Z]/)
    .min(3)
    .max(10)
    .required()
    .messages({
      'string.pattern.base': 'username must not start with digits'
    }),

  email: Joi.string()
  .email({ tlds: { allow: tlds } })
  .required(),

  password: Joi.string()
    .alphanum()
    .min(8)
    .max(30)
    .pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/)
    .required()
    .messages({
      'string.pattern.base': 'password must contain uppercase and lowercase letters, as well as numbers'
    }),

  confirmPassword: Joi.any()
    .valid(Joi.ref('password'))
    .messages({
      'any.only': 'passwords don\'t match'
    })
})

export const validationRegistration = async (formData) => {
  try {
    await registrationSchema.validateAsync(formData, {
      errors: {
        wrap: {
          label: false
        }
      }
    })
  } catch (error) {
    throw new Error(error.message)
  }
}