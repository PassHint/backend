import { Response } from "express";
import { RequestWithUser } from "../middlewares/auth";
import ErrorHelper from "../helpers/error";
import { HintService } from "./service";

export const HintController = {
  CREATE: async (req: RequestWithUser, res: Response) => {
    const { source, content, user } = req.body;

    if(!source || !content) {
      return res.status(400).json(ErrorHelper.user.create.missingParams)
    }

    const { status, ...response } = await HintService.createHint({ content, source, user });

    res.status(status).json(response);
  },
  LIST: async (req: RequestWithUser, res: Response) => {
    const { status, ...response } = await HintService.listHints(req.body.user);

    res.status(status).json(response);
  },
  FIND: async (req: RequestWithUser, res: Response) => {
    const { id } = req.params;

    const { status, ...response } = await HintService.findHint(id, req.body.user);

    res.status(status).json(response);
  },
  UPDATE: async (req: RequestWithUser, res: Response) => {
    // To implement
  },
  DELETE: (req: RequestWithUser, res: Response) => {
    // To implement
  }
}