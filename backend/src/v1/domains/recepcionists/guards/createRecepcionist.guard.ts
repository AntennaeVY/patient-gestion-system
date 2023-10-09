import { NextFunction, Request, Response } from "express";
import { Role, AccountStatus } from "@prisma/client";

import responses from "../../../libs/http";
import { TokenPayload } from "../../../libs/token";

export function createRecepcionistGuard(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    req.body.role = Role.RECEPCIONIST;
    req.body.status = AccountStatus.VERIFIED;

    if (req.user?.role == "ADMIN")
      return next();

    return responses.unauthorized(res, {
      error: "No tienes permiso para realizar esta accion",
    });
  } catch (err) {
    console.log(err);
    responses.internalError(res, { error: "Internal Server Error" });
  }
}
