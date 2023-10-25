import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../../../libs/token";
import { getDoctorShiftService } from "../services/getDoctorShift.service";
import responses from "../../../../../libs/http";

export function getDoctorShiftController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    getDoctorShiftService(id)
      .then((shiftOrNull) => {
        if (!shiftOrNull)
          return responses.notFound(res, { error: "Turno no encontrado" });

        return responses.success(res, { shift: shiftOrNull });
      })
      .catch((err) => {
        console.log(err);

        return responses.internalError(res, { error: "Internal Server Error" });
      });
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
