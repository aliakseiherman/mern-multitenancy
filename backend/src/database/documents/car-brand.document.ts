import { Document } from "mongoose";

export interface CarBrand extends Document {
  _id: Number,
  name: String,
  about: String
}