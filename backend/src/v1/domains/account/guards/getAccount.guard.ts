import { NextFunction, Request, Response } from "express";

import responses from "../../../libs/http";
import { TokenPayload } from "../../../libs/token";

export async function getAccountGuard(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    if (req.isAdmin || req.user?.id == req.params.id) return next();

    return responses.unauthorized(res, {
      error: "No tienes permiso para realizar esta acción.",
    });
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
