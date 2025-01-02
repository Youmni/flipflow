import Joi from "joi";

const validateCardSet = (req, res, next) => {
    
  const schema = Joi.object({
    card_set_id: Joi.number().integer().positive().messages({
        "number.base": "Set ID must be a number.",
        "number.integer": "Set ID must be an integer.",
        "number.positive": "Set ID must be a positive number.",
        "any.required": "Set ID is required.",
      }),
    title: Joi.string().min(4).max(255).messages({
      "string.base": "Title must be a string.",
      "string.min": "Title must be atleast 4 characters.",
      "string.max": "Title cannot be longer than 255 characters.",
      "any.required": "Title name is required.",
    }),
    description: Joi.string().min(15).max(255).messages({
      "string.base": "Description must be a string.",
      "string.min": "Description must be atleast 15 characters.",
      "string.max": "Description cannot be longer than 255 characters.",
      "any.required": "Description is required.",
    }),
    visibility: Joi.string().valid("private", "public").messages({
      "any.only": 'Visibility must be either "private" or "public".',
      "string.base": "Visibility must be a string.",
      "any.required": "Visibility is required.",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: errorMessages });
  }

  next();
};

export default validateCardSet;
