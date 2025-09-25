import { Router } from 'express';
import usersRoutes from './user.routes.js';
import tagsRoutes from './tags.routes.js';
import articlesRoutes from './articles.routes.js';

const router = Router();

router.use('/users', usersRoutes);
router.use('/tags', tagsRoutes);
router.use('/articles', articlesRoutes);

export default router;
