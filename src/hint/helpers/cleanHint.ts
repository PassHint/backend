import { Hint } from "../types";

export default function cleanHint(hint: Hint): Omit<Hint, 'user_id'> {
  return {
    content: hint.content,
    created_at: hint.created_at,
    id: hint.id,
    source: hint.source,
  }
}