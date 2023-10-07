import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import { getServiceService } from "../services/getService.service";

export function getServiceController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    getServiceService(id)
      .then((serviceOrNull) => {
        if (!serviceOrNull)
          return responses.notFound(res, { error: "Servicio no encontrado" });

        return responses.success(res, { service: serviceOrNull });
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
