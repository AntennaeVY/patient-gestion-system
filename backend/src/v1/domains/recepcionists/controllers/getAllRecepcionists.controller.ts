import { Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import { getAllRecepcionistsService } from "../services/getAllRecepcionists.service";

export function getAllRecepcionistsController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
) {
  try {
    const skip = parseInt(req.query.skip as string) || undefined;
    const take = parseInt(req.query.take as string) || undefined;
    
    getAllRecepcionistsService(skip, take)
      .then((recepcionists) => {
        return responses.success(res, { recepcionists: recepcionists });
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
