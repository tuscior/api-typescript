import { Router, Request, Response, NextFunction } from 'express';
import * as express from 'express';
const router = express.Router();

import PostController from '../controllers/PostController';


let controllers = {
  posts: PostController
};


export class ApiRouter {


  // get all resources
  public static getAll( router: Router ): void {
    
    router.get('/:resource', (req: Request, res: Response, next: NextFunction) => {
      const resource = req.params.resource;
      const controller = controllers[resource];

      if (!controller) {
        res.status(404).json({ error: '404 - Resource Not Found' });
      }

      controller.get(req.query, (error, results) => {
        if (error) {
          res.status(500).json({ error });
        }
        res.status(200).json({ results });
      });
    });
  }


  // get a resource by slug
  public static getBySlug( router: Router ): void {
    
    router.get('/:resource/:slug', (req: Request, res: Response, next: NextFunction) => {
      const slug = req.params.slug;
      const resource = req.params.resource;
      const controller = controllers[resource];

      if (!controller) {
        res.status(404).json({ error: '404 - Resource Not Found' });
      }

      controller.get(slug, req.query, (error, result) => {
        if (error) {
          res.status(500).json({ error });
        }
        res.status(200).json({ result });
      });
    });
  }


  // create a resource
  public static create( router: Router ): void {

  }



  // update a resource by slug
  public static updateBySlug( router: Router): void {

  }




  // delete a resource by slug
  public static deleteBySlug( router: Router ): void {

  }




}
