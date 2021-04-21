import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  authors: { type: String, required: true },
  favorite: { type: Boolean, default: false },
  fileCover: { type: String, default: '' },
  fileBook: { type: String, required: true },
});

export const Book = model('Book', bookSchema);
