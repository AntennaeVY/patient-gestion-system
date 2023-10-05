import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";

import responses from "../../../libs/http";
import { getAccountService } from "../../account/services/getAccount.service.";

export async function updatePatientGuard(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    if (req.isAdmin) 
      return next();

    req.body.id = undefined;
    req.body.role = undefined;

    if (req.user?.role == "RECEPCIONIST")
      return next();

    if (req.user?.id !== req.params.id)
      return responses.notFound(res, { error: "Usuario no encontrado" });

    req.body.status = undefined;
    req.body.created_at = undefined;

    return next();
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
