import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../../../libs/token";
import { deleteDoctorShiftService } from "../services/deleteDoctorShift.service";
import responses from "../../../../../libs/http";

export function deleteDoctorShiftController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    deleteDoctorShiftService(id)
      .then((shift) => {
        if (!shift)
          return responses.notFound(res, { error: "Turno no encontrado" });

        return responses.success(res, { shift: shift });
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
