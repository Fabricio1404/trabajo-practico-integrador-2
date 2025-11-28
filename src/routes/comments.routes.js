import { Router } from 'express';
import {
  createComment,
  listCommentsByArticle,
  updateComment,
  deleteComment
} from '../controllers/comments.controller.js';

const router = Router();

router.post('/', createComment);
router.get('/article/:articleId', listCommentsByArticle);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;
