import { Router } from 'express';
import {
  listUsers,
  getUser,
  updateUser,
  deleteUser,
  softDeleteUser
} from '../controllers/users.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const router = Router();

router.use(authMiddleware, adminMiddleware);

router.get('/', listUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/soft-delete', softDeleteUser);

export default router;
