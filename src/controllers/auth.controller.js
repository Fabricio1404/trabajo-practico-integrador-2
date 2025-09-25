import { User } from '../models/user.model.js';


// POST /auth/register
export async function register(req, res) {
  try {
    const { username, email, password, firstName, lastName, biography, avatarUrl } = req.body;

    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) return res.status(400).json({ error: 'Username o email ya registrados' });

    const user = await User.create({
      username,
      email,
      passwordHash: String(password), 
      role: 'user',
      profile: { firstName, lastName, biography, avatarUrl }
    });

    return res.status(201).json({ id: user._id, username: user.username, email: user.email });
  } catch (err) {
    return res.status(500).json({ error: 'Error registrando usuario', detail: err.message });
  }
}

// POST /auth/login
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email y password son obligatorios' });

    const user = await User.findOne({ email, deletedAt: null });
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

    const ok = String(password) === user.passwordHash;
    if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });

    res.cookie('token', String(user._id), {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ message: 'Login OK' });
  } catch (err) {
    return res.status(500).json({ error: 'Error en login', detail: err.message });
  }
}

// GET /auth/profile
export async function profile(req, res) {
  try {
    const userId = req.cookies?.token; // ⚠️ temporal
    if (!userId) return res.status(401).json({ error: 'No autenticado' });

    const user = await User.findOne({ _id: userId, deletedAt: null }).lean();
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    delete user.passwordHash;
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Error obteniendo perfil', detail: err.message });
  }
}

// PUT /auth/profile
export async function updateProfile(req, res) {
  try {
    const userId = req.cookies?.token; // ⚠️ temporal
    if (!userId) return res.status(401).json({ error: 'No autenticado' });

    const updates = {
      'profile.firstName': req.body.firstName,
      'profile.lastName' : req.body.lastName,
      'profile.biography': req.body.biography,
      'profile.avatarUrl': req.body.avatarUrl
    };

    const user = await User.findOneAndUpdate(
      { _id: userId, deletedAt: null },
      { $set: updates },
      { new: true }
    ).lean();

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    delete user.passwordHash;
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Error actualizando perfil', detail: err.message });
  }
}

// POST /auth/logout
export async function logout(req, res) {
  try {
    res.clearCookie('token');
    return res.json({ message: 'Logout OK' });
  } catch (err) {
    return res.status(500).json({ error: 'Error en logout', detail: err.message });
  }
}
