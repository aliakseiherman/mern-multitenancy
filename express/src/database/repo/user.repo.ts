import { model } from 'mongoose';
import { UserSchema } from '../schema/user.schema';
import { User } from '../documents/user.document'

const Users = model<User>('User', UserSchema);

export { Users }