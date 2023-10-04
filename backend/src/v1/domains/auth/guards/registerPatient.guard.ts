import { NextFunction, Request, Response } from "express";
import { Role, AccountStatus } from "@prisma/client";

import responses from "../../../libs/http";

export function registerPatientGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.body.role = Role.PATIENT;
    req.body.status = AccountStatus.UNVERIFIED;

    // Additional patient validation if needed
    next();
  } catch (err) {
    console.log(err);
    responses.internalError(res, { error: "Internal Server Error" });
  }
}
