import { Router } from 'express';
import SessionController from '../controllers/session.controller';

class SessionRouter {
  public router = Router();
  public sessionController = new SessionController();

  constructor() {
    this.registerRoutes();
  }

  private registerRoutes() {
    this.router.get('/session', [
      this.sessionController.getCurrentLoginDetails
    ])
  }
}

export default SessionRouter;