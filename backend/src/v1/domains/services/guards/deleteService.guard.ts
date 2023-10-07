import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";

export function deleteServiceGuard(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    if (req.isAdmin || req.user?.role == "RECEPCIONIST")
		return next();

    return responses.unauthorized(res, {
      error: "No tienes permiso para realizar esta acción",
    });
  } catch (err) {
    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
