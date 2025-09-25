import { Router } from 'express';
import {
  createTag,
  listTags,
  getTag,
  updateTag,
  deleteTag
} from '../controllers/tags.controller.js';

const router = Router();

// Por ahora SIN middlewares ni validaciones
router.post('/', createTag);
router.get('/', listTags);
router.get('/:id', getTag);
router.put('/:id', updateTag);
router.delete('/:id', deleteTag);

export default router;
