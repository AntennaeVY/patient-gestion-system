import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../../../libs/token";
import responses from "../../../../../libs/http";

export function getDoctorShiftGuard(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    if (
      req.user?.id == req.params.id ||
      req.user?.role == "ADMIN" ||
      req.user?.role == "RECEPCIONIST"
    )
      return next();

    return responses.unauthorized(res, {
      error: "No tienes permiso para realizar esta accion",
    });
  } catch (err) {
    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
