import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (v) => /^\S+$/.test(v), // sin espacios
      message: 'El nombre no debe contener espacios'
    }
  },
  description: {
    type: String,
    maxlength: 200
  }
}, { timestamps: true });

// índice único por name (refuerza la unicidad)
tagSchema.index({ name: 1 }, { unique: true });

export const Tag = mongoose.model('Tag', tagSchema);
