import { Buffer } from 'buffer';
import { Schema, Document, model, Model } from 'mongoose';
import { User } from '../auth/user.model';

export enum BOOK_TYPE {
  PUBLIC = 'PUBLIC',
  PRIVET = 'PRIVET',
}
const BookSchema = new Schema({
  title: { type: String, unique: true },
  description: { type: String },
  author: String,
  cover: { data: Buffer, contentType: String },
  publication_date: { type: String, required: true },
  type: { type: BOOK_TYPE, required: true },
  user_id: { type: String },
});

BookSchema.virtual('owner', {
  ref: 'User',
  localField: 'user_id',
  foreignField: '_id',
  justOne: true,
});

BookSchema.set('toJSON', { virtuals: false });

export default BookSchema;

export interface Book extends Document {
  title: string;
  description: string;
  cover: { data: { type: string; data: Array<any> }; contentType: string };
  author: string;
  publication_date: any;
  type: BOOK_TYPE;
  user_id: string;
  owner: User;
}

// const Book: Model<IBook> = model('Book', bookSchema);
// export default Book;
