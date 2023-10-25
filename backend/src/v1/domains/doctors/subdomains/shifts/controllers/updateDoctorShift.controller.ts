import { NextFunction, Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TokenPayload } from "../../../../../libs/token";
import { UpdateDoctorShiftDto } from "../dtos/updateDoctorShift.dto";
import { updateDoctorShiftService } from "../services/updateDoctorShift.service";
import responses from "../../../../../libs/http";

export function updateDoctorShiftController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const updateDoctorShiftDto = req.body as UpdateDoctorShiftDto;

    updateDoctorShiftService(id, updateDoctorShiftDto)
      .then((result) => {
        return responses.success(res, { shift: result });
      })
      .catch((err) => {
        console.log(err);

        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code == "P2002")
            return responses.badRequest(res, {
              error: "El valor ya se encuentra en uso",
              fields: err.meta?.target,
            });

          if (err.code == "P2016" || err.code == "P2025")
            return responses.notFound(res, {
              error: "Turno no encontrado",
            });
        }

        return responses.internalError(res, { error: "Internal Server Error" });
      });
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
