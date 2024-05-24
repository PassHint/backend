import { Request, Response } from 'express';
import supabase from '../database';
import ErrorHelper from '../../helpers/error';
import { UserService } from './service';

const UserController = {
  POST: async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if(!username || !password) {
      return res.status(400).json(ErrorHelper.user.create.missingParams)
    }

    const { success, error, status } = await UserService.createUser({ username, password });
    const message = success ? "User created successfully!" : "The user was not created." 

    res.status(status).json({ success, error, message });
  }
}

export default UserController;
