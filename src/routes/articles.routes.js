import { Router } from 'express';
import {
  createArticle,
  listArticles,
  getArticle,
  updateArticle,
  deleteArticle,
  addTagToArticle,
  removeTagFromArticle
} from '../controllers/articles.controller.js';

const router = Router();

router.post('/', createArticle);
router.get('/', listArticles);
router.get('/:id', getArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

// Relación N:M 
router.post('/:articleId/tags/:tagId', addTagToArticle);
router.delete('/:articleId/tags/:tagId', removeTagFromArticle);

export default router;
