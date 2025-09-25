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
      validator: (v) => /^\S+$/.test(v), 
      message: 'El nombre no debe contener espacios'
    }
  },
  description: {
    type: String,
    maxlength: 200
  }
}, { timestamps: true });


tagSchema.index({ name: 1 }, { unique: true });

export const Tag = mongoose.model('Tag', tagSchema);
