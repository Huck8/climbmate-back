import { Joi } from 'express-validation';

export const authValidation = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
};

export const registerValidation = {
  body: Joi.object({
    name: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
};

export const excursionValidation = {
  body: Joi.object({
    imgExcursion: Joi.string(),
    nameExcursion: Joi.string(),
    date: Joi.date(),
    needEquipment: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  }),
};
