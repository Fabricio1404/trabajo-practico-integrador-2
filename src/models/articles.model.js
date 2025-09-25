import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    minlength: 50 
  },
  excerpt: {
    type: String,
    maxlength: 500
  },
  status: {
    type: String,
    enum: ['published', 'archived'],
    default: 'published'
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Relación N:M con Tag
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag'
    }
  ]
}, { timestamps: true });


articleSchema.index({ title: 1 });

export const Article = mongoose.model('Article', articleSchema);
