import { Router } from 'express';
import {
  listUsers,
  getUser,
  updateUser,
  deleteUser,
  softDeleteUser
} from '../controllers/users.controller.js';

const router = Router();

router.get('/', listUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/soft-delete', softDeleteUser);

export default router;
