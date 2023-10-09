import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import {
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
import { UpdateRecepcionistDto } from "../dtos/updateRepcionist.dto";
import { updateRecepcionistService } from "../services/updateRecepcionist.service";

export function updateRecepcionistController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const updateRecepcionistDto = req.body as UpdateRecepcionistDto;

    updateRecepcionistService(id, updateRecepcionistDto)
      .then((result) => {
        return responses.success(res, { recepcionist: result });
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
