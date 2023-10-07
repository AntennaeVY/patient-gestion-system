import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import responses from "../../../libs/http";
import { CreateServiceDto } from "../dtos/createService.dto";
import { createServiceService } from "../services/createService.service";

export function createServiceController(req: Request, res: Response) {
  try {
    const createServiceDto = req.body as CreateServiceDto;

    createServiceService(createServiceDto)
      .then(() => {
        responses.created(res, { message: "Servicio creado exitosamente" });
      })
      .catch((err) => {
        console.log(err);

        return responses.internalError(res, {
          error: "Internal Server Error",
        });
      });

  } catch (err) {
    console.log(err);

    return responses.internalError(res, { message: "Internal Server Error" });
  }
}
