import { Request, Response, Router } from 'express';
import Post from '../models/Post';
import PostController from './postcontroller'

export class PostRouter {

  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  // get a single post by params of 'slug'
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

  // create a new post
  public create(req: Request, res: Response): void {
    const title: string = req.body.title;
    const slug: string = req.body.slug;
    const content: string = req.body.content;
    const featuredImage: string = req.body.featuredImage;
    const category: string = req.body.category;
    const published: boolean = req.body.published;

    if (!title || !slug || !content) {
      res.status(422).json({ message: 'All Fields Required.' });
    }

    const post = new Post({
      title,
      slug,
      content,
      featuredImage,
      category,
      published
    });

    post.save()
    .then((data) => {
      res.status(201).json({ data });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  }

  // update post by params of 'slug'
  public update(req: Request, res: Response): void {
    const slug: string = req.body.slug;

    Post.findOneAndUpdate({slug}, req.body)
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  }

  // delete post by params of 'slug'
  public delete(req: Request, res: Response): void {
    const slug: string = req.body.slug;

    Post.findOneAndRemove({slug})
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  }

  public routes() {
    this.router.get('/', PostController.getAll);
    this.router.get('/:slug', this.one);
    this.router.post('/', this.create);
    this.router.put('/:slug', this.update);
    this.router.delete('/:slug', this.delete);
  }

}

const postRoutes = new PostRouter();
postRoutes.routes();

export default postRoutes.router;