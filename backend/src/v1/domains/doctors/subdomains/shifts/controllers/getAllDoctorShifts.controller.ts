import { Request, Response } from "express";
import { TokenPayload } from "../../../../../libs/token";
import { getAllDoctorShiftsService } from "../services/getAllDoctorShifts.service";
import responses from "../../../../../libs/http";

export function getAllDoctorShiftsController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response
) {
  try {
    const skip = parseInt(req.query.skip as string) || undefined;
    const take = parseInt(req.query.take as string) || undefined;
    const doctorId = req.params.id;

    getAllDoctorShiftsService(doctorId, skip, take)
      .then((shifts) => {
        return responses.success(res, { shifts: shifts });
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
