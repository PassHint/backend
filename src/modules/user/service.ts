import { AuthService } from "../../auth/service";
import ErrorHelper from "../../helpers/error";
import generateErrorResponse from "../../helpers/generateErrorResponse";
import RegExpHelper from "../../helpers/regexp";
import supabase from "../database";
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

    try {
      const supabaseResponse = await supabase.from('users').insert({ username, password_hash: passwordHash });

      const isSuccess = supabaseResponse.status === 201;
      if(!isSuccess) throw supabaseResponse.error;

      return { success: isSuccess, status: 201, error: null };
    } catch(e) {
      console.error(e);
      return generateErrorResponse(ErrorHelper.unexpected, 500);
    }    
  },
  async getUserByUsername(username: string): Promise<User | null> {
    const { data } = await supabase.from('users').select('*').eq('username', username);
    
    if(!data) return null;

    const [user] = data as [User];
    return user;
  }
}
