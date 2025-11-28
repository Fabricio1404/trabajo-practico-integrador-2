import { body } from 'express-validator';

export const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('username debe tener entre 3 y 30 caracteres'),
  body('email')
    .isEmail()
    .withMessage('Email inválido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('password debe tener al menos 6 caracteres'),
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('firstName debe tener entre 2 y 50 caracteres'),
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('lastName debe tener entre 2 y 50 caracteres')
];

export const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Email inválido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('password debe tener al menos 6 caracteres')
];
