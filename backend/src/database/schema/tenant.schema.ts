import { Schema } from 'mongoose'

const TenantSchema = new Schema({
  _id: Number,
  name: String
})

export { TenantSchema }