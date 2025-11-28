import { body } from 'express-validator';

const createTagValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('name debe tener entre 2 y 30 caracteres')
];

const updateTagValidation = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 30 })
    .withMessage('name debe tener entre 2 y 30 caracteres')
];

export default {
  createTagValidation,
  updateTagValidation
};
