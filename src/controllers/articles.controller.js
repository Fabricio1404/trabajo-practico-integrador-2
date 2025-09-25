import { Article } from '../models/articles.model.js';
import { Comment } from '../models/comment.model.js';
import { Tag } from '../models/tag.model.js';
import { User } from '../models/user.model.js';

// POST /articles
export async function createArticle(req, res) {
  try {
    const { title, content, excerpt, status, author } = req.body;

    if (!author) return res.status(400).json({ error: 'El campo author es requerido' });

    // chequeo básico: que el autor exista
    const user = await User.findById(author).select('_id');
    if (!user) return res.status(400).json({ error: 'author inválido (usuario no existe)' });

    const article = await Article.create({ title, content, excerpt, status, author });
    return res.status(201).json(article);
  } catch (err) {
    return res.status(500).json({ error: 'Error creando artículo', detail: err.message });
  }
}

// GET /articles
export async function listArticles(req, res) {
  try {
    const arts = await Article.find({})
      .populate('author', 'username')
      .populate('tags', 'name')
      .lean();
    return res.json(arts);
  } catch (err) {
    return res.status(500).json({ error: 'Error listando artículos', detail: err.message });
  }
}

// GET /articles/:id
export async function getArticle(req, res) {
  try {
    const art = await Article.findById(req.params.id)
      .populate('author', 'username')
      .populate('tags', 'name')
      .lean();
    if (!art) return res.status(404).json({ error: 'No encontrado' });
    return res.json(art);
  } catch (err) {
    return res.status(500).json({ error: 'Error obteniendo artículo', detail: err.message });
  }
}

// PUT /articles/:id
export async function updateArticle(req, res) {
  try {
    const { title, content, excerpt, status } = req.body;
    const art = await Article.findByIdAndUpdate(
      req.params.id,
      { $set: { title, content, excerpt, status } },
      { new: true }
    ).lean();
    if (!art) return res.status(404).json({ error: 'No encontrado' });
    return res.json(art);
  } catch (err) {
    return res.status(500).json({ error: 'Error actualizando artículo', detail: err.message });
  }
}

//  
export async function deleteArticle(req, res) {
  try {
    const art = await Article.findByIdAndDelete(req.params.id);
    if (!art) return res.status(404).json({ error: 'No encontrado' });

    await Comment.deleteMany({ article: art._id }); 
    return res.json({ message: 'Artículo eliminado y comentarios en cascada' });
  } catch (err) {
    return res.status(500).json({ error: 'Error eliminando artículo', detail: err.message });
  }
}

 
export async function addTagToArticle(req, res) {
  try {
    const { articleId, tagId } = req.params;

    // chequeo básico: que la tag exista
    const tag = await Tag.findById(tagId).select('_id name');
    if (!tag) return res.status(400).json({ error: 'tagId inválido (tag no existe)' });

    const updated = await Article.findByIdAndUpdate(
      articleId,
      { $addToSet: { tags: tagId } },
      { new: true }
    ).populate('tags', 'name').lean();

    if (!updated) return res.status(404).json({ error: 'Artículo no encontrado' });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ error: 'Error agregando tag al artículo', detail: err.message });
  }
}

export async function removeTagFromArticle(req, res) {
  try {
    const { articleId, tagId } = req.params;

    const updated = await Article.findByIdAndUpdate(
      articleId,
      { $pull: { tags: tagId } },
      { new: true }
    ).populate('tags', 'name').lean();

    if (!updated) return res.status(404).json({ error: 'Artículo no encontrado' });
    return res.json(updated);
  } catch (err) {
    return res.status(500).json({ error: 'Error removiendo tag del artículo', detail: err.message });
  }
}
