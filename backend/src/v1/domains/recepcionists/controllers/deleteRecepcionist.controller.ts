import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { deleteRecepcionistService } from "../services/deleteRecepcionist.service";

export function deleteRecepcionistController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    deleteRecepcionistService(id)
      .then((recepcionist) => {
        if (!recepcionist)
          return responses.notFound(res, { error: "Recepcionista no encontrado" });

        return responses.success(res, { recepcionist: recepcionist });
      })
      .catch((err) => {
        console.log(err);

        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code == "P2025")
            return responses.notFound(res, {
              error: "Recepcionista no encontrado",
            });
        }

        return responses.internalError(res, { error: "Internal Server Error" });
      });
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
