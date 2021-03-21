import { Router } from 'express'
import CarBrandController from '../controllers/car-brand.controller'
import AuthMiddleware from '../middleware/auth.middleware'

class CarBrandRouter {
  public router = Router();
  public carBrandController = new CarBrandController();
  public authMiddleware = new AuthMiddleware();

  constructor() {
    this.registerRoutes()
  }

  private registerRoutes() {
    this.router.get('/v1/car-brands', [
      this.authMiddleware.validateJwtToken,
      this.carBrandController.getAll
    ])
    this.router.get('/v1/car-brands/:id', [
      this.authMiddleware.validateJwtToken,
      this.carBrandController.get
    ])
    this.router.post('/v1/car-brands', [
      this.authMiddleware.validateJwtToken,
      this.carBrandController.create
    ])
    this.router.put('/v1/car-brands/:id', [
      this.authMiddleware.validateJwtToken,
      this.carBrandController.update
    ])
    this.router.delete('/v1/car-brands/:id', [
      this.authMiddleware.validateJwtToken,
      this.carBrandController.delete
    ])
  }
}

export default CarBrandRouter