import { Request, Response } from 'express';
import supabase from '../modules/database';
import ErrorHelper from '../helpers/error';
import { UserService } from './service';
import { generateErrorPayload } from '../helpers/generateErrorResponse';

const UserController = {
  POST: async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if(!username || !password) {
      return res.status(400).json(generateErrorPayload(ErrorHelper.user.create.missingParams));
    }

    const { status, ...response } = await UserService.createUser({ username, password });

    res.status(status).json(response);
  }
}

export default UserController;
