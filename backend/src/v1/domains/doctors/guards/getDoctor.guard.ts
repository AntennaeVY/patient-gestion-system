import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";

export function getDoctorGuard(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    return next();
  } catch (err) {
    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
