import { Comment } from '../models/comment.model.js';
import { Article } from '../models/article.model.js';
import { User } from '../models/user.model.js';


export async function createComment(req, res) {
  try {
    const { content, author, article } = req.body;

    if (!content || !author || !article) {
      return res.status(400).json({ error: 'content, author y article son obligatorios' });
    }

    
    const [user, art] = await Promise.all([
      User.findById(author).select('_id'),
      Article.findById(article).select('_id')
    ]);
    if (!user) return res.status(400).json({ error: 'author inválido (usuario no existe)' });
    if (!art)  return res.status(400).json({ error: 'article inválido (artículo no existe)' });

    const c = await Comment.create({ content, author, article });
    return res.status(201).json(c);
  } catch (err) {
    return res.status(500).json({ error: 'Error creando comentario', detail: err.message });
  }
}


export async function listCommentsByArticle(req, res) {
  try {
    const { articleId } = req.params;
    const comments = await Comment.find({ article: articleId })
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .lean();
    return res.json(comments);
  } catch (err) {
    return res.status(500).json({ error: 'Error listando comentarios', detail: err.message });
  }
}


export async function updateComment(req, res) {
  try {
    const { content } = req.body;
    const up = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: { content } },
      { new: true }
    ).lean();

    if (!up) return res.status(404).json({ error: 'No encontrado' });
    return res.json(up);
  } catch (err) {
    return res.status(500).json({ error: 'Error actualizando comentario', detail: err.message });
  }
}


export async function deleteComment(req, res) {
  try {
    const del = await Comment.findByIdAndDelete(req.params.id);
    if (!del) return res.status(404).json({ error: 'No encontrado' });
    return res.json({ message: 'Comentario eliminado' });
  } catch (err) {
    return res.status(500).json({ error: 'Error eliminando comentario', detail: err.message });
  }
}
