import { Document } from "mongoose"

export interface Tenant extends Document {
  _id: Number,
  name: String
}