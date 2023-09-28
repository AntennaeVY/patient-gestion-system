import { NextFunction, Request, Response } from "express";

import responses from "../../../libs/http";
import { isValidEmail } from "../../../libs/validation";

export function loginAccountGuard(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;

    if (!isValidEmail(email))
      return responses.badRequest(res, {
        error: "El valor proporcionado es inválido",
        fields: ["email"],
      });
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }

  next();
}
