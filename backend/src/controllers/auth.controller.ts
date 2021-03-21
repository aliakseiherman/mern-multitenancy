import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Users } from '../database/repo/user.repo'
import * as passwordHelper from '../helpers/password.helper'
import TenantService from '../services/tenant.service'
import { jwt as jwtConfig } from '../config.json'

class AuthController {
  public tenantService = new TenantService();

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, password, rememberMe } = req.body

      let user = await Users.findOne({ name: username })

      if (!user) {
        res.sendStatus(401)
        return
      }

      if (passwordHelper.isMatched(password, user.salt, user.password)) {

        let tenant = await this.tenantService.getTenantBySubdomain(req.headers.origin)

        let expiresIn = rememberMe ? '7d' : '20m'

        const token = jwt.sign(
          { userId: user._id, tenantId: tenant._id },
          jwtConfig.secret,
          { expiresIn }
        )

        res.json({ token })

      } else {
        res.sendStatus(401)
      }
    } catch (error) {
      next(error)
    }
  }
}

export default AuthController