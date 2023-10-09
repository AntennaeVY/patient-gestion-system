import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";

export function getAllRecepcionistsGuard(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const skip = req.query.skip as string;
    const take = req.query.take as string;

    if ((skip && isNaN(parseInt(skip))) || (take && isNaN(parseInt(take))))
      return responses.badRequest(res, {
        error: "Párametros de paginación inválidos",
      });

    if (req.isAdmin) 
      return next();

    return responses.unauthorized(res, {
      error: "No tienes permiso para realizar esta accion",
    });
  } catch (err) {
    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
