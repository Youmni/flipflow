import Joi from 'joi';

const validateUser = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(50).pattern(/^[a-zA-Z\s]+$/).messages({
      'string.max': 'First name cannot be longer than 50 characters.',
      'string.pattern.base': 'Last name cannot contain numbers or special characters.',
      'any.required': 'First name is required.'
    }),
    last_name: Joi.string().min(3).max(50).pattern(/^[a-zA-Z\s]+$/).messages({
      'string.max': 'Last name cannot be longer than 50 characters.',
      'string.pattern.base': 'Last name cannot contain numbers or special characters.',
      'any.required': 'Last name is required.'
    }),
    username: Joi.string().min(5).max(50).messages({
      'string.max': 'Username cannot be longer than 50 characters.',
      'any.required': 'Username is required.'
    }),
    email: Joi.string().email().messages({
      'string.email': 'Invalid email format.',
      'any.required': 'Email is required.'
    }),
    password: Joi.string().min(6).messages({
      'string.min': 'Password must be at least 6 characters long.',
      'any.required': 'Password is required.'
    })
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map(detail => detail.message);
    return res.status(400).json({ message: errorMessages });
  }

  next();
}

export default validateUser;