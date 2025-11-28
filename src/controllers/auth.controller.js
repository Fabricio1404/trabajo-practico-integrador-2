import { matchedData } from 'express-validator';
import { User } from '../models/user.model.js';
import { hashPassword, comparePassword } from '../helpers/bcrypt.helper.js';
import { generateToken } from '../helpers/jwt.helper.js';

export async function register(req, res) {
  try {
    const data = matchedData(req, { locations: ['body'], nested: true });

    const exists = await User.findOne({
      $or: [{ username: data.username }, { email: data.email }]
    });

    if (exists) {
      return res.status(400).json({ error: 'Username o email ya registrados' });
    }

    const passwordHash = await hashPassword(data.password);

    const user = await User.create({
      username: data.username,
      email: data.email,
      passwordHash,
      role: 'user',
      profile: {
        firstName: data.firstName,
        lastName: data.lastName,
        biography: data.biography || '',
        avatarUrl: data.avatarUrl || ''
      }
    });

    const plainUser = user.toObject();
    delete plainUser.passwordHash;

    return res.status(201).json(plainUser);
  } catch (err) {
    return res.status(500).json({ error: 'Error registrando usuario', detail: err.message });
  }
}

export async function login(req, res) {
  try {
    const data = matchedData(req, { locations: ['body'], nested: true });

    const user = await User.findOne({ email: data.email, deletedAt: null });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const ok = await comparePassword(data.password, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generateToken({
      id: user._id.toString(),
      role: user.role
    });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 60 * 60 * 1000
    });

    return res.json({ message: 'Login OK' });
  } catch (err) {
    return res.status(500).json({ error: 'Error en login', detail: err.message });
  }
}

export async function profile(req, res) {
  try {
    const userId = req.user.id;

    const user = await User.findOne({ _id: userId, deletedAt: null }).lean();
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    delete user.passwordHash;
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Error obteniendo perfil', detail: err.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const userId = req.user.id;

    const updates = {
      'profile.firstName': req.body.firstName,
      'profile.lastName': req.body.lastName,
      'profile.biography': req.body.biography,
      'profile.avatarUrl': req.body.avatarUrl
    };

    const user = await User.findOneAndUpdate(
      { _id: userId, deletedAt: null },
      { $set: updates },
      { new: true }
    ).lean();

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    delete user.passwordHash;
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Error actualizando perfil', detail: err.message });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie('token');
    return res.json({ message: 'Logout OK' });
  } catch (err) {
    return res.status(500).json({ error: 'Error en logout', detail: err.message });
  }
}
