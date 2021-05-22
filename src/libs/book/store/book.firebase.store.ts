import { Injectable } from '@nestjs/common';

import { BookDto } from '../dto/book.dto';
import { FirebaseService } from 'src/utils/firebase/firebase.service';

@Injectable()
export class BookFirebaseStore {
  constructor(private readonly firebaseService: FirebaseService) {}

  private collection = this.firebaseService.db.collection('books');

  createBook = async (book: BookDto): Promise<string | null> => {
    try {
      const res = await this.collection.add(book);

      return res.id;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  getBooks = async () => {
    try {
      const books = await this.collection.get();

      return books.docs.map((doc) => ({ _id: doc.id, ...doc.data() }));
    } catch {
      return null;
    }
  };

  getBookById = async (id: string) => {
    try {
      const doc = await this.collection.doc(id).get();
      const data = doc.data();

      if (!data) return null;

      return { ...data, _id: doc.id } as BookDto & { _id: string };
    } catch {
      return null;
    }
  };

  updateBook = async (id: string, book: BookDto) => {
    try {
      const docRef = this.collection.doc(id);
      return await docRef.update(book);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  deleteBook = async (id: string) => {
    try {
      await this.collection.doc(id).delete();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };
}
