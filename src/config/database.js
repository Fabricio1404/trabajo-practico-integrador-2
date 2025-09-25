import mongoose from 'mongoose';

export async function connectDatabase(uri) {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri);
    console.log('Conectado a la base de datos');
  } catch (err) {
    console.error('No se pudo conectar a la base de datos', err.message);
    process.exit(1);
  }
}
