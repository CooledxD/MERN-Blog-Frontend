import Joi from "joi";

export const validationCreateComment = async (comment) => {
  try {
    Joi.assert(
      comment,
      Joi.string()
        .trim()
        .required(),
        {
          errors: {
            wrap: {
              label: false
            }
          }
        } 
    )
  } catch (error) {
    throw new Error(error.message)
  }
}