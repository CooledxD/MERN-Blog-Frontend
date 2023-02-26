import Joi from "joi";

// Joi schema
const createPostSchema = Joi.object({
  title: Joi.string()
    .trim()
    .required(),

  text: Joi.string()
    .trim()
    .replace(/<[^>]+>/g, '')
    .required(),

  image: Joi.object()
    .empty('')
})

export const validationCreatePost = async (formData) => {
  try {
    await createPostSchema.validateAsync(formData, {
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