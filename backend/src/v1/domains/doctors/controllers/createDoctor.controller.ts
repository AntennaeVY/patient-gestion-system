import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import responses from "../../../libs/http";
import { createDoctorService } from "../services/createDoctor.service";
import { CreateDoctorDto } from "../dtos/createDoctor.dto";

export function createDoctorController(req: Request, res: Response) {
  try {
    const createDoctorDto = req.body as CreateDoctorDto;

    createDoctorService(createDoctorDto)
      .then(() => {
        responses.created(res, { message: "Cuenta creada exitosamente" });
      })
      .catch((err) => {
        console.log(err);

        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code == "P2002") {
            const fields = err.meta?.target;

            return responses.badRequest(res, {
              error: "El valor proporcionado ya se encuentra en uso",
              fields: fields,
            });
          }
        }

        return responses.internalError(res, {
          error: "Internal Server Error",
        });
      });
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { message: "Internal Server Error" });
  }
}
