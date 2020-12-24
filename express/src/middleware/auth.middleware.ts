import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwt as jwtConfig } from '../config.json';

class AuthMiddleware {

  public validateJwtToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {

      let fragments = authHeader.split(' ');

      if (fragments[0] === 'Bearer') {

        let token = fragments[1];

        jwt.verify(token, jwtConfig.secret, (err, payload: any) => {
          if (err) {
            res.sendStatus(403);
          }

          req['userId'] = payload.userId;
          req['tenantId'] = payload.tenantId;
          next();
        });

      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  }
}

export default AuthMiddleware;