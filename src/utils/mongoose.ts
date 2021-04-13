import mongoose from 'mongoose';

const DB_PASS = process.env.DB_PASS || 'qwerty';
const DB_NAME = process.env.DB_NAME || 'library';
const DB_URL = `mongodb+srv://user:${DB_PASS}@cluster0.hvmwr.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

export const connectToDb = () =>
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
