import { Request, Response, Router } from 'express';
import Post from '../models/Post';
import PostController from './postController'

export class PostRouter {

  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public one(req: Request, res: Response): void {
    const slug: string = req.params.slug;
    
    Post.findOne({slug})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  }

  public update(req: Request, res: Response): void {
    const slug: string = req.body.slug;

  }

  public delete(req: Request, res: Response): void {
    const slug: string = req.body.slug;
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