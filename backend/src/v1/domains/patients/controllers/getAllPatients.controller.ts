import { Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import { getAllPatientsService } from "../services/getAllPatients.service";
import responses from "../../../libs/http";

export function getAllPatientsController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
) {
  try {
    const skip = parseInt(req.query.skip as string) || undefined;
    const take = parseInt(req.query.take as string) || undefined;
    
    getAllPatientsService(skip, take)
      .then((patients) => {
        return responses.success(res, { patients: patients });
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
