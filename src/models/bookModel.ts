import { Schema, model, Document } from 'mongoose';

interface IBook extends Document {
  title: string;
  author: string;
  publicationDate: string;
  quantity: number;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationDate: { type: String, required: true },
  quantity: { type: Number, required: true },
});

bookSchema.index({ title: 1, author: 1 });

const Book = model<IBook>('Book', bookSchema);

export default Book;
