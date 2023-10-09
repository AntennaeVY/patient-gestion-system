import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import {
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
import { UpdateDoctorDto } from "../dtos/updateDoctor.dto";
import { updateDoctorService } from "../services/updateDoctor.service";

export function updateDoctorController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const updateDoctorDto = req.body as UpdateDoctorDto;

    updateDoctorService(id, updateDoctorDto)
      .then((result) => {
        return responses.success(res, { doctor: result });
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
              error: "Doctor no encontrado",
            });
        }

        return responses.internalError(res, { error: "Internal Server Error" });
      });
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }
}