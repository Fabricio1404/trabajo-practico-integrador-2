import { Router } from 'express';
import {
  createTag,
  listTags,
  getTag,
  updateTag,
  deleteTag
} from '../controllers/tags.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';
import tagValidations from '../middlewares/validations/tag.validations.js';
import { validate } from '../middlewares/validator.js';

const { createTagValidation, updateTagValidation } = tagValidations;

const router = Router();

router.get('/', listTags);
router.get('/:id', getTag);

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  createTagValidation,
  validate,
  createTag
);

router.put(
  '/:id',
  authMiddleware,
  adminMiddleware,
  updateTagValidation,
  validate,
  updateTag
);

router.delete('/:id', authMiddleware, adminMiddleware, deleteTag);

export default router;
