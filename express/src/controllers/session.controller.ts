import { NextFunction, Request, Response } from 'express';
import TenantService from '../services/tenant.service';
import jwt from 'jsonwebtoken';
import { jwt as jwtConfig } from '../config.json';

class SessionController {
  public tenantService = new TenantService();

  public getCurrentLoginDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let result = {};

      let payload;

      try {
        payload = await this.getJwtPayload(req);
      } catch (err) {
        console.error(err);
      }

      if (payload) {
        let tenantId = payload.tenantId;

        if (!tenantId) {
          let tenant = await this.tenantService.getTenantBySubdomain(req.headers.origin);
          tenantId = tenant._id;
        }

        result = {
          userId: payload.userId,
          tenantId: tenantId
        };
      } else {
        let tenant = await this.tenantService.getTenantBySubdomain(req.headers.origin);
        result = { tenantId: tenant._id }
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  private getJwtPayload = async (req: Request): Promise<any> => {
    let payload = null;

    const authHeader = req.headers.authorization;

    if (authHeader) {
      let fragments = authHeader.split(' ');

      if (fragments[0] === 'Bearer') {
        let token = fragments[1];
        payload = jwt.verify(token, jwtConfig.secret);
      }
    }

    return payload;
  }
}

export default SessionController;