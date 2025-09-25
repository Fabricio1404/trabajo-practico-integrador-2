import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 50,
    match: [/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'Solo letras']
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 50,
    match: [/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'Solo letras']
  },
  biography: { type: String, maxlength: 500 },
  avatarUrl: { type: String, maxlength: 500 }
}, { _id: false });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
    match: [/^[A-Za-z0-9]+$/, 'Alfanumérico (sin espacios)']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email inválido']
  },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user','admin'], default: 'user' },
  profile: { type: profileSchema, required: true },
  deletedAt: { type: Date, default: null } 
}, { timestamps: true });

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.model('User', userSchema);
