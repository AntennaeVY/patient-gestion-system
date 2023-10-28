import { Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import { getAllAppointmentsService } from "../services/getAllAppointments.service";
import responses from "../../../libs/http";

export function getAllAppointmentsController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response
) {
  try {
    const skip = parseInt(req.query.skip as string) || undefined;
    const take = parseInt(req.query.take as string) || undefined;
    const doctor_id = req.query.doctor_id as string;
    const patient_id = req.query.patient_id as string;

    getAllAppointmentsService({ doctor_id, patient_id, skip, take })
      .then((appointments) => {
        if (!appointments)
          return responses.notFound(res, { error: "Citas no encontradas" });

        return responses.success(res, { appointments: appointments });
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
