import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { deleteServiceService } from "../services/deleteService.service";

export function deleteServiceController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    deleteServiceService(id)
      .then((service) => {
        return responses.success(res, { service: service });
      })
      .catch((err) => {
        console.log(err);

        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code == "P2016" || err.code == "P2025")
            return responses.notFound(res, { error: "Servicio no encontrado" });
        }

        return responses.internalError(res, { error: "Internal Server Error" });
      });
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
