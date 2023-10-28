import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import responses from "../../../libs/http";
import { CreateAppointmentDto } from "../dtos/createAppointment.dto";
import { createAppointmentService } from "../services/createAppointment.service";

export function createAppointmentController(req: Request, res: Response) {
  try {
    const createAppointmentDto = req.body as CreateAppointmentDto;

    createAppointmentService(createAppointmentDto)
      .then(() => {
        responses.created(res, { message: "Cita creada exitosamente" });
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
