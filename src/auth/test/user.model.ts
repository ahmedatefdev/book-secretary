import { Schema, Document } from 'mongoose';

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

interface IUser extends Document {
  id: string;
  first_name: string;
  email: string;
  password: string;
  salt: string;
}
