import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 500
  },
  // autor del comentario
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // artículo al que pertenece
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  }
}, { timestamps: true });

// Índice para listar comentarios por artículo en orden reciente
commentSchema.index({ article: 1, createdAt: -1 });

export const Comment = mongoose.model('Comment', commentSchema);
