import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import { getRecepcionistService } from "../services/getRecepcionist.service";

export function getRecepcionistController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    getRecepcionistService(id)
      .then((recepcionistOrNull) => {
        if (!recepcionistOrNull)
          return responses.notFound(res, { error: "Recepcionista no encontrado" });

        return responses.success(res, { recepcionist: recepcionistOrNull });
      })
      .catch((err) => {
        console.log(err);

        return responses.internalError(res, { error: "Internal Server Error" });
      });
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
