import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../../../libs/token";
import responses from "../../../../../libs/http";
import { isValidTime, isValidWeekday } from "../../../../../libs/validation";

export function createDoctorShiftGuard(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const { day, start_time, end_time } = req.body;

    const fields = [];

    if (!isValidWeekday(day)) fields.push("day");

    if (!isValidTime(start_time)) fields.push("start_time");

    if (!isValidTime(end_time)) fields.push("end_time");

    if (fields.length > 0)
      return responses.badRequest(res, {
        error: "El valor proporcionado es inválido",
        fields: fields,
      });

    req.body.doctor_id = undefined;

    if (req.user?.role == "ADMIN" || req.user?.role == "RECEPCIONIST")
      return next();

    return responses.unauthorized(res, {
      error: "No tienes permiso para realizar esta accion",
    });
  } catch (err) {
    console.log(err);
    responses.internalError(res, { error: "Internal Server Error" });
  }
}
