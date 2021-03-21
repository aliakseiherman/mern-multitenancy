import { Router } from 'express'
import AccountController from '../controllers/account.controller'
import AuthController from '../controllers/auth.controller'

class AccountRouter {
  public router = Router();
  public authController = new AuthController();
  public accountController = new AccountController();

  constructor() {
    this.registerRoutes()
  }

  private registerRoutes() {
    this.router.post('/login', [
      this.authController.logIn
    ])
    this.router.post('/register', [
      this.accountController.register
    ])
  }
}

export default AccountRouter