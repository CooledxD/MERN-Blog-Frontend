import Joi from "joi";

// Joi schema
const updatePostSchema = Joi.object({
  title: Joi.string()
    .trim()
    .required(),

  text: Joi.string()
    .trim()
    .replace(/<[^>]+>/g, '')
    .required(),

  image: Joi.any()
    .empty('')
})

export const validationUpdatePost = async (formData) => {
  try {
    await updatePostSchema.validateAsync(formData, {
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