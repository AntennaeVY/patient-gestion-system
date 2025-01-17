import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { deleteDoctorService } from "../services/deleteDoctor.service";

export function deleteDoctorController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    deleteDoctorService(id)
      .then((doctor) => {
        if (!doctor)
          return responses.notFound(res, { error: "Doctor no encontrado" });

        return responses.success(res, { doctor: doctor });
      })
      .catch((err) => {
        console.log(err);

        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code == "P2025")
            return responses.notFound(res, { error: "Doctor no encontrado" });
        }

        return responses.internalError(res, { error: "Internal Server Error" });
      });
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
