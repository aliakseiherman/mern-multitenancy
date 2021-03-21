import { Document } from "mongoose"

export interface User extends Document {
  _id: Number,
  username: String,
  password: String,
  salt: String
}