import { Router } from 'express';
import usersRoutes from './user.routes.js';
import tagsRoutes from './tags.routes.js';

const router = Router();

router.use('/users', usersRoutes);
router.use('/tags', tagsRoutes);

export default router;
