import Joi from "joi";

const validateTag = (req, res, next) => {
    
  const schema = Joi.object({
    name: Joi.string().min(4).max(255).messages({
      "string.base": "Name must be a string.",
      "string.min": "Name must be atleast 4 characters.",
      "string.max": "Name cannot be longer than 255 characters.",
      "any.required": "Name name is required.",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ message: errorMessages });
  }

  next();
};

export default validateTag;
