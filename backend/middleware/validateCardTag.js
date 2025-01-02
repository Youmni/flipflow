import Joi from "joi";

const validateCardTag = (req, res, next) => {
    
  const schema = Joi.object({
    card_id: Joi.number().integer().positive().messages({
        "number.base": "Card ID must be a number.",
        "number.integer": "Card ID must be an integer.",
        "number.positive": "Card ID must be a positive number.",
        "any.required": "Card ID is required.",
    }),
    tag_id: Joi.number().integer().positive().messages({
        "number.base": "Tag ID must be a number.",
        "number.integer": "Tag ID must be an integer.",
        "number.positive": "Tag ID must be a positive number.",
        "any.required": "Tag ID is required.",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: errorMessages });
  }

  next();
};

export default validateCardTag;
