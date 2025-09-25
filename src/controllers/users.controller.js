import { User } from '../models/user.model';

export async function listUsers(req, res) {
  try {
    const users = await User.find({}).select('-passwordHash').lean();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: 'Error listando usuarios', detail: err.message });
  }
}

export async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash').lean();
    if (!user) return res.status(404).json({ error: 'No encontrado' });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Error obteniendo usuario', detail: err.message });
  }
}

// (actualiza rol)
export async function updateUser(req, res) {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { role } },
      { new: true }
    ).select('-passwordHash').lean();

    if (!user) return res.status(404).json({ error: 'No encontrado' });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Error actualizando usuario', detail: err.message });
  }
}

// DELETE 
export async function deleteUser(req, res) {
  try {
    const r = await User.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ error: 'No encontrado' });
    return res.json({ message: 'Usuario eliminado (físico)' });
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
    if (!r) return res.status(404).json({ error: 'No encontrado' });
    return res.json({ message: 'Usuario marcado como eliminado (lógico)', id: r._id });
  } catch (err) {
    return res.status(500).json({ error: 'Error en soft delete', detail: err.message });
  }
}
