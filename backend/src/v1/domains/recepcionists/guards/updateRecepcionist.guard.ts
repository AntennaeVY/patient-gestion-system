import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";

import responses from "../../../libs/http";

export async function updateRecepcionistGuard(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    if (req.isAdmin) 
      return next();

    req.body.id = undefined;
    req.body.role = undefined;
    req.body.created_at = undefined;
    req.body.status = undefined;

    if (req.user?.id !== req.params.id)
      return responses.notFound(res, { error: "Recepcionista no encontrado" });

    return next();
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
