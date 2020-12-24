import * as passwordHelper from '../helpers/password.helper';
import { Users } from '../database/repo/user.repo';

class UsersSeed {
  public seed = async (): Promise<void> => {
    [{ name: 'admin' }].forEach(async (user, i) => {
      await Users.exists({ name: user.name }, async (err, res) => {
        if (!res) {

          let salt = passwordHelper.generateSalt();
          let password = passwordHelper.getHash('123qwe', salt);

          await new Users({ _id: i + 1, name: user.name, password: password, salt: salt }).save();
        }
      });
    });
  }
}

export default UsersSeed;