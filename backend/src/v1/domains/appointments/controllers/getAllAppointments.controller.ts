import { Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import { getAllAppointmentsService } from "../services/getAllAppointments.service";
import responses from "../../../libs/http";

export function getAllAppointmentsController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response
) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 5;
    const doctor_id = req.query.doctor_id as string;
    const patient_id = req.query.patient_id as string;

    getAllAppointmentsService({ doctor_id, patient_id, page, size })
      .then((result) => {
        if (!result)
          return responses.notFound(res, { error: "Citas no encontradas" });

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
