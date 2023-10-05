import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import { getPatientService } from "../services/getPatient.service";

export function getPatientController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    getPatientService(id)
      .then((patientOrNull) => {
        if (!patientOrNull)
          return responses.notFound(res, { error: "Usuario no encontrado" });

        return responses.success(res, { patient: patientOrNull });
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
