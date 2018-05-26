import { Request, Response, Router } from 'express';
import Post from '../models/Post';
import PostController from './postController'

export class PostRouter {

  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.param('id', PostController.findByParam)
    this.router.get('/', PostController.getAll)
    this.router.get('/:id', PostController.getOne)
    this.router.post('/', PostController.createOne)
    this.router.put('/:id', PostController.updateOne)
    this.router.delete('/:id', PostController.deleteOne)
  }

}

const postRoutes = new PostRouter();
postRoutes.routes();

export default postRoutes.router;