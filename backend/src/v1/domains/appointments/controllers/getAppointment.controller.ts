import { Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import { getAppointmentService } from "../services/getAppointment.service";

export function getAppointmentController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response
) {
  try {
    getAppointmentService(req.params.id)
      .then((appointment) => {
        if (!appointment)
          return responses.notFound(res, { error: "Cita no encontrada" });

        if (
          (req.user?.role == "PATIENT" &&
            req.user.id != appointment.patient_id) ||
          (req.user?.role == "DOCTOR" && 
		  	req.user.id != appointment.doctor_id)
        )
          return responses.unauthorized(res, {
            error: "No tienes permisos para realizar esta acción",
          });

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
