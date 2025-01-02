import Joi from "joi";

const validateCard = (req, res, next) => {
    
  const schema = Joi.object({
    user_id: Joi.number().integer().positive().messages({
        "number.base": "User ID must be a number.",
        "number.integer": "User ID must be an integer.",
        "number.positive": "User ID must be a positive number.",
        "any.required": "User ID is required.",
    }),
    question: Joi.string().min(4).max(255).messages({
      "string.base": "Question must be a string.",
      "string.min": "Question must be atleast 4 characters.",
      "string.max": "Question cannot be longer than 255 characters.",
      "any.required": "Question name is required.",
    }),
    answer: Joi.string().min(2).max(255).messages({
      "string.base": "Answer must be a string.",
      "string.min": "Answer must be atleast 2 characters.",
      "string.max": "Answer cannot be longer than 255 characters.",
      "any.required": "Answer is required.",
    }),
  }).or("question", "answer");

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: errorMessages });
  }

  next();
};

export default validateCard;
