import Joi from "joi";

// Joi schema
const loginSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .pattern(/^[a-zA-Z]/)
    .min(3)
    .max(10)
    .required()
    .messages({
      'string.pattern.base': 'username must not start with digits'
    }),

  password: Joi.string()
    .alphanum()
    .min(8)
    .max(30)
    .pattern(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/)
    .required()
    .messages({
      'string.pattern.base': 'password must contain uppercase and lowercase letters, as well as numbers'
    }),
})

export const validationLogin = async (formData) => {
  try {
    await loginSchema.validateAsync(formData, {
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