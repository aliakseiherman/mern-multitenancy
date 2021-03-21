import { NextFunction, Request, Response } from 'express'
import TenantService from '../services/tenant.service'
import UserService from '../services/user.service'
import jwt from 'jsonwebtoken'
import { jwt as jwtConfig } from '../config.json'

class AccountController {
  public userService = new UserService();
  public tenantService = new TenantService();

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password } = req.body

      if (!username || !password) {
        res.sendStatus(403)
        return
      }

      let user =
        await this.userService.create({
          username: username,
          password: password
        })

      if (!user) {
        res.sendStatus(403)
        return
      }

      let tenant = await this.tenantService.getTenantBySubdomain(req.headers.origin)

      const token = jwt.sign({ userId: user._id, tenantId: tenant._id }, jwtConfig.secret)

      res.json({ token })
    } catch (error) {
      next(error)
    }
  }
}

export default AccountController