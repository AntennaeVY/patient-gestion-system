import { Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import { updateAppointmentService } from "../services/updateAppointment.service";

export function updateAppointmentController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response
) {
  try {
    updateAppointmentService(req.params.id, req.body)
      .then((appointment) => {
        if (!appointment)
          return responses.notFound(res, { error: "Cita no encontrada" });

        return responses.success(res, { appointment: appointment });
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
