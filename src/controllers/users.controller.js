import { User } from '../models/user.model.js';

export async function listUsers(req, res) {
  try {
    const users = await User.find({ deletedAt: null }).select('-passwordHash').lean();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: 'Error listando usuarios', detail: err.message });
  }
}

export async function getUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.id, deletedAt: null })
      .select('-passwordHash')
      .lean();
    if (!user) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Error obteniendo usuario', detail: err.message });
  }
}

export async function updateUser(req, res) {
  try {
    const baseUpdates = {
      username: req.body.username,
      email: req.body.email,
      role: req.body.role
    };

    const updates = {};
    Object.keys(baseUpdates).forEach(key => {
      if (baseUpdates[key] !== undefined) {
        updates[key] = baseUpdates[key];
      }
    });

    const user = await User.findOneAndUpdate(
      { _id: req.params.id, deletedAt: null },
      { $set: updates },
      { new: true }
    )
      .select('-passwordHash')
      .lean();

    if (!user) {
      return res.status(404).json({ error: 'No encontrado' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Error actualizando usuario', detail: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const del = await User.findByIdAndDelete(req.params.id);
    if (!del) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    return res.json({ message: 'Usuario eliminado', id: del._id });
  } catch (err) {
    return res.status(500).json({ error: 'Error eliminando usuario', detail: err.message });
  }
}

export async function softDeleteUser(req, res) {
  try {
    const r = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { deletedAt: new Date() } },
      { new: true }
    );
    if (!r) {
      return res.status(404).json({ error: 'No encontrado' });
    }
    return res.json({ message: 'Usuario marcado como eliminado (lógico)', id: r._id });
  } catch (err) {
    return res.status(500).json({ error: 'Error en soft delete', detail: err.message });
  }
}
