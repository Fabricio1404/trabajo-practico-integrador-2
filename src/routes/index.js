import { Router } from 'express';
import authRoutes from './auth.routes.js';
import usersRoutes from './users.routes.js';
import tagsRoutes from './tags.routes.js';
import articlesRoutes from './articles.routes.js';
import commentsRoutes from './comments.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/tags', tagsRoutes);
router.use('/articles', articlesRoutes);
router.use('/comments', commentsRoutes);

export default router;
