import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../libs/token";
import responses from "../../libs/http";

export function updatePatientGuard(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const { isAdmin, user } = req;
    const { id } = req.params;

    if (!isAdmin && user?.id != id)
      return responses.notFound(res, { error: "Usuario no encontrado" });

	if (!req.body)
	  return responses.badRequest(res, {error: "Los campos a actualizar son requeridos"});

	

  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }

  next();
}
