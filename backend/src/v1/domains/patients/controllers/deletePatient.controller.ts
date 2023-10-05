import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import { deletePatientService } from "../services/deletePatient.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function deletePatientController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    deletePatientService(id)
      .then((patient) => {
        return responses.success(res, { patient: patient });
      })
      .catch((err) => {
        console.log(err);

        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code == "P2025")
            return responses.notFound(res, { error: "Usuario no encontrado" });
        }

        return responses.internalError(res, { error: "Internal Server Error" });
      });
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
