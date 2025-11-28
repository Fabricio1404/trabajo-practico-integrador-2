import { verifyToken } from '../helpers/jwt.helper.js';

export function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}
