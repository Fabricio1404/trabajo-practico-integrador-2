import { Tag } from '../models/tag.model.js';
import { Article } from '../models/article.model.js';

// POST /tags
export async function createTag(req, res) {
  try {
    const { name, description } = req.body;
    const exists = await Tag.findOne({ name });
    if (exists) return res.status(400).json({ error: 'Tag ya existe' });

    const tag = await Tag.create({ name, description });
    return res.status(201).json(tag);
  } catch (err) {
    return res.status(500).json({ error: 'Error creando tag', detail: err.message });
  }
}

// GET /tags
export async function listTags(req, res) {
  try {
    const tags = await Tag.find({}).lean();
    return res.json(tags);
  } catch (err) {
    return res.status(500).json({ error: 'Error listando tags', detail: err.message });
  }
}

// GET /tags/:id
export async function getTag(req, res) {
  try {
    const tag = await Tag.findById(req.params.id).lean();
    if (!tag) return res.status(404).json({ error: 'No encontrado' });

    // "populate reverso": artículos que usan esta tag
    const articles = await Article.find({ tags: tag._id })
      .populate('author', 'username')
      .lean();

    return res.json({ ...tag, articles });
  } catch (err) {
    return res.status(500).json({ error: 'Error obteniendo tag', detail: err.message });
  }
}

// PUT /tags/:id
export async function updateTag(req, res) {
  try {
    const { name, description } = req.body;
    const tag = await Tag.findByIdAndUpdate(
      req.params.id,
      { $set: { name, description } },
      { new: true }
    ).lean();

    if (!tag) return res.status(404).json({ error: 'No encontrado' });
    return res.json(tag);
  } catch (err) {
    return res.status(500).json({ error: 'Error actualizando tag', detail: err.message });
  }
}

// DELETE /tags/:id
export async function deleteTag(req, res) {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ error: 'No encontrado' });

    // cascada: remover la tag de todos los artículos
    await Article.updateMany({ tags: tag._id }, { $pull: { tags: tag._id } });

    return res.json({ message: 'Tag eliminada y removida de artículos' });
  } catch (err) {
    return res.status(500).json({ error: 'Error eliminando tag', detail: err.message });
  }
}
