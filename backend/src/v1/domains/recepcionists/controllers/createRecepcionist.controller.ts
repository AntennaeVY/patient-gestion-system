import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import responses from "../../../libs/http";
import { createRecepcionistService } from "../services/createRecepcionist.service";
import { CreateRecepcionistDto } from "../dtos/createRecepcionist.dto";

export function createRecepcionistController(req: Request, res: Response) {
  try {
    const createRecepcionistDto = req.body as CreateRecepcionistDto;

    createRecepcionistService(createRecepcionistDto)
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
