import { Router } from 'express';
import {
  register,
  login,
  profile,
  updateProfile,
  logout
} from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login',    login);
router.get('/profile',   profile);
router.put('/profile',   updateProfile);
router.post('/logout',   logout);

export default router;
