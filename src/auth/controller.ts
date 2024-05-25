import { Request, Response } from 'express';
import ErrorHelper from '../helpers/error';
import { AuthService } from './service';
import { generateErrorPayload } from '../helpers/generateErrorResponse';

export const AuthController = {
  LOGIN: async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if(!username || !password) {
      return res.status(400).json(generateErrorPayload(ErrorHelper.auth.login.missingParams));
    }

    const { status, ...response } = await AuthService.login({ username, password });

    res.status(status).json(response);
  }
}
