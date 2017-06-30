import { Router, Request, Response } from 'express';
import User from '../models/User';

class UserRouter {

  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public GetUsers(req: Request, res: Response): void {
    
    User.find()
    .then((users) => {
      let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
        users
      });
    })
    .catch((error) => {
      let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
        error
      });
    })
  
  }

  public GetUser(req: Request, res: Response): void {
    const username: string = req.params.username;

    User.findOne({ username })
    .then((data) => {
      let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
        data
      });
    })
    .catch((error) => {
      let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
        error
      });
    })

  }

  public CreateUser(req: Request, res: Response): void {
    const firstName: string = req.body.firstName;
    const lastName: string = req.body.lastName;
    const username: string = req.body.username;
    const email: string = req.body.email
    const password: string = req.body.password;


    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password
    })

    user.save()
    .then((data) => {
      let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
        data
      });
    })
    .catch((error) => {
      let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
        error
      });
    })

  }

  public UpdateUser(req: Request, res: Response): void {
    const username: string = req.params.username;

    User.findOneAndUpdate({ username }, req.body)
    .then((data) => {
      let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
        data
      });
    })
    .catch((error) => {
      let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
        error
      });
    })

  }

  public DeleteUser(req: Request, res: Response): void {
    const username: string = req.params.username;

    User.findOneAndRemove({ username })
    .then(() => {
      let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
        "success": "User was deleted."
      });
    })
    .catch((error) => {
      let code = res.statusCode;
      let msg = res.statusMessage;
      res.json({
        code,
        msg,
        error
      });
    })

  }

  // set up our routes
  routes() {
    this.router.get('/', this.GetUsers);
    this.router.get('/:username', this.GetUser);
    this.router.post('/', this.CreateUser);
    this.router.put('/:username', this.UpdateUser);
    this.router.delete('/:username', this.DeleteUser);
  }

}

const userRoutes = new UserRouter();
userRoutes.routes();


export default userRoutes.router;