import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import { UpdatePatientDto } from "../dtos/updatePatient.dto";
import { updatePatientService } from "../services/updatePatient.service";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

export function updatePatientController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const updatePatientDto = req.body as UpdatePatientDto;

    updatePatientService(id, updatePatientDto)
      .then((result) => {
        return responses.success(res, { patient: result });
      })
      .catch((err) => {
        console.log(err);

        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code == "P2002")
            return responses.badRequest(res, {
              error: "El valor ya se encuentra en uso",
              fields: err.meta?.target,
            });
        }

        return responses.internalError(res, { error: "Internal Server Error" });
      });
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
