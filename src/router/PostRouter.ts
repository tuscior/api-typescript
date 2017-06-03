import { Router, Request, Response, NextFunction } from "express";
import Post from '../models/Post';


export class PostRouter {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public getAllPosts(req: Request, res: Response, next: NextFunction) {
    Post.find()
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((error) => {
      res.status(500).json({ error });
    })
  }

  public getPostBySlug(req: Request, res: Response, next: NextFunction) {
    const slug: string = req.params.slug;
    
    Post.findOne({slug})
    .then((post) => {
      res.status(200).json({ post });
    })
    .catch((error) => {
      res.status(500).json({ error });
    })
  }


  // create post
  public createPost(req: Request, res: Response, next: NextFunction): void {
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
    .then((post) => {
      res.status(200).json({ post });
    })
    .catch((error) => {
      res.status(500).json({ error });
    })
  }


  // update post by slug
  public updatePost(req: Request, res: Response, next: NextFunction): void {
    const slug: string = req.body.slug;

    Post.findOneAndUpdate({slug}, req.body)
    .then((post) => {
      res.status(200).json({ post });
    })
    .catch((error) => {
      res.status(500).json({ error });
    })
  }


  // delete post by slug
  public deletePost(req: Request, res: Response, next: NextFunction): void {
    const slug: string = req.body.slug;

    Post.findOneAndRemove({slug})
    .then((post) => {
      res.status(200).json({ post });
    })
    .catch((error) => {
      res.status(500).json({ error });
    })
  }



  routes() {
    this.router.get('/', this.getAllPosts);
    this.router.get('/:slug', this.getPostBySlug);
    this.router.post('/', this.createPost);
    this.router.put('/:slug', this.updatePost);
    this.router.delete('/:slug', this.deletePost);
  }


}

const postRoutes = new PostRouter();
postRoutes.routes();

export default postRoutes.router;