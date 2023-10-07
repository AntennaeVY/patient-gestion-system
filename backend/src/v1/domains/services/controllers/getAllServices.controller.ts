import { Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import { getAllServicesService } from "../services/getAllServices.service";

export function getAllServicesController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response
) {
  try {
    const skip = parseInt(req.query.skip as string) || undefined;
    const take = parseInt(req.query.take as string) || undefined;

    getAllServicesService(skip, take)
      .then((services) => {
        return responses.success(res, { services: services });
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
