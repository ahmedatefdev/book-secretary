import { Schema, Document, model, Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Book } from '../books/book.model';

const UserSchema = new Schema({
  first_name: { type: String, minlength: 3, required: true, maxlength: 225 },
  last_name: { type: String, minlength: 3, required: true, maxlength: 225 },
  email: {
    type: String,
    minlength: 3,
    required: true,
    maxlength: 225,
    unique: true,
  },
  password: { type: String, required: true },
  salt: { type: String, required: true },
});

UserSchema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'user_id',
  justOne: false,
});

UserSchema.methods.isPasswordValid = async function(
  password: string,
): Promise<boolean> {
  const hash = await bcrypt.hash(password, this.salt);
  return hash === this.password;
};

UserSchema.set('toJSON', { virtuals: true });
export default UserSchema;

export interface User extends Document {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  salt: string;
  books: Book[];
  isPasswordValid: (password: string) => Promise<boolean>;
}

// const User: Model<IUser> = model('User', userSchema);
// export default User;
