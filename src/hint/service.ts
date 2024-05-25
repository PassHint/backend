import ErrorHelper from "../helpers/error";
import generateErrorResponse from "../helpers/generateErrorResponse";
import generateSuccessResponse from "../helpers/generateSuccessResponse";
import supabase from "../modules/database";
import { User } from "../user/types";
import cleanHint from "./helpers/cleanHint";
import { Hint } from "./types";

interface CreateHintDTO {
  content: string;
  source: string;
  user: User;
}

export const HintService = {
  async createHint({ content, source, user }: CreateHintDTO) {
    const supabaseResponse = await supabase.from('hints').insert({ source, content, user_id: user.id }).select();

    if(supabaseResponse.status === 409) {
      return generateErrorResponse(ErrorHelper.hint.create.alreadyExists);
    }

    if(supabaseResponse.status !== 201) {
      return generateErrorResponse(ErrorHelper.hint.create.unexpected, 500);
    }

    const [hint] = supabaseResponse.data as [Hint];

    return generateSuccessResponse(cleanHint(hint));
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

    if(supabaseResponse.status !== 200) {
      return generateErrorResponse(ErrorHelper.hint.list.unexpected, 500);
    }

    if(supabaseResponse.data?.length === 0) {
      return generateErrorResponse(ErrorHelper.hint.find.notFound, 404);
    }

    const [hint] = supabaseResponse.data as [Hint];

    return generateSuccessResponse(cleanHint(hint));
  },
  async updateHint(id: number, user: User, fields: Pick<Hint, 'content' | 'source'>) {
    const fieldsToUpdate = {} as Pick<Hint, 'content' | 'source'>;

    if(fields.content) fieldsToUpdate.content = fields.content;
    if(fields.source) fieldsToUpdate.source = fields.source;

    const supabaseResponse = await supabase.from('hints').update(fieldsToUpdate).eq('user_id', user.id).eq('id', id).select();

    if(supabaseResponse.status !== 200) {
      return generateErrorResponse(ErrorHelper.hint.update.unexpected, 500);
    }

    if(supabaseResponse.data?.length === 0) {
      return generateErrorResponse(ErrorHelper.hint.update.notFound, 404);
    }

    const [hint] = supabaseResponse.data as [Hint];

    return generateSuccessResponse(hint, 200);
  },
  async deleteHint(id: number, user: User) {
    const supabaseResponse = await supabase.from('hints').delete().eq('user_id', user.id).eq('id', id).select();

    if(supabaseResponse.status !== 200) {
      return generateErrorResponse(ErrorHelper.hint.delete.unexpected, 500);
    }

    if(supabaseResponse.data?.length === 0) {
      return generateErrorResponse(ErrorHelper.hint.delete.notFound, 404);
    }

    return generateSuccessResponse(null, 204);
  },
}