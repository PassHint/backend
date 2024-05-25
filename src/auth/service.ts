import ErrorHelper from "../helpers/error";
import generateErrorResponse from "../helpers/generateErrorResponse";
import supabase from "../modules/database";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { User } from "../user/types";
import generateSuccessResponse from "../helpers/generateSuccessResponse";
import { UserService } from "../user/service";
import dotenv from 'dotenv';

dotenv.config();

interface LoginDTO {
  username: string;
  password: string;
}

const SIX_HOURS = 6 * 60 * 60;
const jwtSecret = process.env.JWT_SECRET!;

export const AuthService = {
  async login ({ username, password }: LoginDTO) {
    
    const user = await UserService.getUserByUsername(username);

    if(!user) {
      return generateErrorResponse(ErrorHelper.auth.login.userNotFound, 404);
    }

    const passwordHash = this.generatePasswordHash(password);

    if(passwordHash !== user.password_hash) {
      return generateErrorResponse(ErrorHelper.auth.login.wrongPassword);
    }

    return generateSuccessResponse({
      id: user.id,
      username: user.username,
      token: this.generateAuthToken(user),
    });
  },
  generatePasswordHash(password: string) {
    const passwordHash = crypto
      .createHmac('sha256', process.env.PASSWORD_SALT!)
      .update(password)
      .digest('hex');

    return passwordHash;
  },
  generateAuthToken({ id, username }: User) {
    const token = jwt.sign(
      { id, username },
      jwtSecret,
      { expiresIn: SIX_HOURS },
    );

    return token;
  },
  validateToken(userToken: string, user: User): boolean {
    try {
      jwt.verify(userToken, jwtSecret);
      return true;
    } catch(e) {
      console.error(e);
      return false;
    }
  }
}
