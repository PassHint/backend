import { AuthService } from "../auth/service";
import ErrorHelper from "../helpers/error";
import generateErrorResponse from "../helpers/generateErrorResponse";
import generateSuccessResponse from "../helpers/generateSuccessResponse";
import RegExpHelper from "../helpers/regexp";
import supabase from "../modules/database";
import { User } from "./types";

interface CreateUserDTO {
  username: string;
  password: string;
}

export const UserService = {
  async createUser({ username, password }: CreateUserDTO) {
    const isPasswordStrong = RegExpHelper.STRONG_PASSWORD.test(password);

    if(!isPasswordStrong) {
      return generateErrorResponse(ErrorHelper.user.create.weakPassword);
    }

    const passwordHash = AuthService.generatePasswordHash(password);

    const supabaseResponse = await supabase.from('users').insert({ username, password_hash: passwordHash });

    if(supabaseResponse.status === 409) {
      return generateErrorResponse(ErrorHelper.user.create.alreadyExists, 400);
    }

    if(supabaseResponse.error) {
      return generateErrorResponse(ErrorHelper.unexpected, 500);
    }

    return generateSuccessResponse(null, 201);
  },
  async getUserByUsername(username: string): Promise<User | null> {
    const { data } = await supabase.from('users').select('*').eq('username', username);
    
    if(!data) return null;

    const [user] = data as [User];
    return user;
  }
}
