import { NextFunction, Request, Response } from 'express';
import CarBrandService from '../services/car-brand.service';

class CarBrandController {
  public carBrandService = new CarBrandService();

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      let result = await this.carBrandService.getAll(req['tenantId']);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.params.id) {
        res.sendStatus(404);
        return;
      }

      let result = await this.carBrandService.get({ id: req.params.id, tenantId: req['tenantId'] });

      if (!result) {
        res.sendStatus(404);
        return;
      }

      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, about } = req.body;

      let result = await this.carBrandService.create({ name, about, tenantId: req['tenantId'] });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { about } = req.body;
      const { id } = req.params;

      let result = await this.carBrandService.update({ id, about, tenantId: req['tenantId'] });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      let result = await this.carBrandService.delete({ id, tenantId: req['tenantId'] });
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default CarBrandController;