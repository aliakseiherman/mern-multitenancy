import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { jwt as jwtConfig } from '../config.json'
import { extractAccessTokenFromRequest } from '../helpers/token.helper'

class AuthMiddleware {

  public validateJwtToken = (req: Request, res: Response, next: NextFunction) => {

    try {
      let token = extractAccessTokenFromRequest(req)

      jwt.verify(token, jwtConfig.secret, (err, payload: any) => {
        if (err) {
          res.sendStatus(403)
        }

        req['userId'] = payload.userId
        req['tenantId'] = payload.tenantId
        next()
      })
    } catch (error) {
      res.sendStatus(401)
    }
  }
}

export default AuthMiddleware