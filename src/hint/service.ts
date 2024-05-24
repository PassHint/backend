import ErrorHelper from "../helpers/error";
import generateErrorResponse from "../helpers/generateErrorResponse";
import generateSuccessResponse from "../helpers/generateSuccessResponse";
import supabase from "../modules/database";
import { User } from "../modules/user/types";
import cleanHint from "./helpers/cleanHint";
import { Hint } from "./types";

interface CreateHintDTO {
  content: string;
  source: string;
  user: User;
}

export const HintService = {
  async createHint({ content, source, user }: CreateHintDTO) {
    const supabaseResponse = await supabase.from('hints').insert({ source, content, user_id: user.id });

    if(supabaseResponse.status === 409) {
      return generateErrorResponse(ErrorHelper.hint.create.alreadyExists);
    }

    if(supabaseResponse.status !== 201) {
      return generateErrorResponse(ErrorHelper.hint.create.unexpected, 500);
    }

    return generateSuccessResponse(null);
  },
  async listHints(user: User) {
    const supabaseResponse = await supabase.from('hints').select('*').eq('user_id', user.id);

    if(supabaseResponse.status !== 200) {
      return generateErrorResponse(ErrorHelper.hint.list.unexpected, 500);
    }

    return generateSuccessResponse(supabaseResponse.data?.map(cleanHint) ?? []);
  },
  async findHint(id: number, user: User) {
    const supabaseResponse = await supabase.from('hints').select('*').eq('user_id', user.id).eq('id', id);

    console.log(supabaseResponse);

    if(supabaseResponse.status !== 200) {
      return generateErrorResponse(ErrorHelper.hint.list.unexpected, 500);
    }

    if(supabaseResponse.data?.length === 0) {
      return generateErrorResponse(ErrorHelper.hint.find.notFound, 404);
    }

    const [hint] = supabaseResponse.data as [Hint];

    return generateSuccessResponse(cleanHint(hint));
  }
}