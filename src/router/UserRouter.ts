import { Request, Response, Router } from 'express';
import User from '../models/User';
import userController from './userController'
class UserRouter {

  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.get('/', userController.getAll);
    this.router.get('/:username', userController.getOne);
    this.router.post('/', userController.createOne);
    this.router.put('/:username', userController.updateOne);
    this.router.delete('/:username', userController.deleteOne);
  }

}

const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;