import { Request, Response, NextFunction } from 'express';
import * as Promise from 'bluebird';
import Post from '../models/Post';


class PostController {

  // get all posts
  public static get(params, callback): void {
    
    Post.find(params, (err, posts) => {
      if (err) {
        callback(err, null);
      }
      callback(null, posts);
    })
  }



  // get post by slug
  public static getBySlug(slug, params, callback): void {
    
    Post.findOne({slug}, (err, post) => {
			if (err){
				if (callback != null)
					callback({ message:'Profile Not Found' }, null)

				return
			}

			if (callback != null)
				callback(null, post)
		})
  }



  // create post


  // update post



  // delete post


}


export default PostController;