import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import { isValidId } from "../../../libs/validation";

export function getAllAppointmentsGuard(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const skip = req.query.skip as string;
    const take = req.query.take as string;

    const patient_id = req.query.patient_id as string;
    const doctor_id = req.query.doctor_id as string;

    if (
      (req.user?.role == "PATIENT" && req.user.id != patient_id) ||
      (req.user?.role == "DOCTOR" && req.user.id != doctor_id)
    )
      return responses.unauthorized(res, {
        error: "No tienes permisos para realizar esta acción",
      });

    if ((skip && isNaN(parseInt(skip))) || (take && isNaN(parseInt(take))))
      return responses.badRequest(res, {
        error: "Párametros de paginación inválidos",
      });

    if (
      (patient_id && !isValidId(patient_id)) ||
      (doctor_id && !isValidId(doctor_id))
    ) {
      return responses.badRequest(res, {
        error: "Identificador de paciente o de doctor inválido",
      });
    }

    return next();
  } catch (err) {
    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
