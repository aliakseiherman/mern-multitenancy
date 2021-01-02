import { Schema } from 'mongoose';

const UserSchema = new Schema({
  _id: Number,
  name: String,
  password: String,
  salt: String
});

export { UserSchema }