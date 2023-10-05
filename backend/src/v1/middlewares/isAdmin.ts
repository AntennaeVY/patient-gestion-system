import { NextFunction, Request, Response } from "express";
import responses from "../libs/http";
import { TokenPayload } from "../libs/token";

export function isAdminMiddleware(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  if (!req.isAdmin)
    return responses.unauthorized(res, {
      error: "No tienes permiso para ejecutar esta acción",
    });

  return next();
}
