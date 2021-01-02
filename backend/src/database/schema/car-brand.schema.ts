import { Schema } from 'mongoose';

const CarBrandSchema = new Schema({
  _id: Number,
  name: String,
  about: String
});

export { CarBrandSchema }