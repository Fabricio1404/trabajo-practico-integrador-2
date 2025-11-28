import { Router } from 'express';
import {
  register,
  login,
  profile,
  updateProfile,
  logout
} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { registerValidation, loginValidation } from '../middlewares/validations/auth.validations.js';
import { validate } from '../middlewares/validator.js';

const router = Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', loginValidation, validate, login);
router.get('/profile', authMiddleware, profile);
router.put('/profile', authMiddleware, updateProfile);
router.post('/logout', authMiddleware, logout);

export default router;
