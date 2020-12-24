import { Router } from 'express';
import CarBrandController from '../controllers/car-brand.controller';
import AuthMiddleware from '../middleware/auth.middleware';

class CarBrandRouter {
  public router = Router();
  public carBrandController = new CarBrandController();
  public authMiddleware = new AuthMiddleware();

  constructor() {
    this.registerRoutes();
  }

  private registerRoutes() {
    this.router.get('/api/car-brand', [
      this.authMiddleware.validateJwtToken,
      this.carBrandController.getAll
    ])
    this.router.get('/api/car-brand/:id', [
      this.authMiddleware.validateJwtToken,
      this.carBrandController.get
    ])
    this.router.post('/api/car-brand', [
      this.authMiddleware.validateJwtToken,
      this.carBrandController.create
    ])
    this.router.put('/api/car-brand/:id', [
      this.authMiddleware.validateJwtToken,
      this.carBrandController.update
    ])
    this.router.delete('/api/car-brand/:id', [
      this.authMiddleware.validateJwtToken,
      this.carBrandController.delete
    ])
  }
}

export default CarBrandRouter;