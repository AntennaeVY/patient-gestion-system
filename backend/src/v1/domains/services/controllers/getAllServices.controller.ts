import { Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import { getAllServicesService } from "../services/getAllServices.service";

export function getAllServicesController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response
) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 5;

    getAllServicesService(page, size)
      .then((result) => {
        if (!result)
          return responses.notFound(res, { error: "Servicios no encontrados" });

        return responses.success(res, result);
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
