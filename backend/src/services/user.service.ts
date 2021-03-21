import { User } from "../database/documents/user.document"
import * as passwordHelper from '../helpers/password.helper'
import { Users } from '../database/repo/user.repo'
import { getNextId } from '../helpers/db.helper'

class UserService {

  public async create(input: any): Promise<User> {
    const { username, password } = input

    let nextId = await getNextId(Users)

    let salt = passwordHelper.generateSalt()
    let newPassword = passwordHelper.getHash(password, salt)

    let resultUser

    await new Promise<void>((resolve, reject) => {
      Users.exists({ name: username }, async (err, res) => {
        if (!res) {
          resultUser =
            await new Users({ _id: nextId, name: username, password: newPassword, salt: salt }).save()
        }
        resolve()
      })
    })

    return resultUser
  }
}

export default UserService