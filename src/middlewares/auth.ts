import { Request, Response, NextFunction } from "express";
import ErrorHelper from "../helpers/error";
import jwt from "jsonwebtoken";
import { UserService } from "../modules/user/service";
import { AuthService } from "../auth/service";
import { User } from "../modules/user/types";

const errorPayload = { success: false, error: ErrorHelper.auth.unauthorized, data: null }

export type RequestWithUser = Request<never, never, { user: User }, never>

export default async function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];
  
  if(!token) {
    return res.status(401).send(errorPayload);
  }

  const cleanToken = token.replace('Bearer ', '');
  const decoded = jwt.decode(cleanToken) as { id: string, username: string };

  if(!decoded.id || !decoded.username) {
    return res.status(401).send(errorPayload);
  }

  const user = await UserService.getUserByUsername(decoded.username);
  
  if(!user) {
    return res.status(401).send(errorPayload);
  }

  const isTokenValid = AuthService.validateToken(cleanToken, user);

  if(!isTokenValid) {
    return res.status(401).send(errorPayload);
  }

  req.body.user = user;

  next();
}
