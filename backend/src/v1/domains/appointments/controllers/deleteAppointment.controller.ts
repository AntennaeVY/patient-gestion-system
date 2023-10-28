import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { deleteAppointmentService } from "../services/deleteAppointment.service";

export function deleteAppointmentController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    deleteAppointmentService(id)
      .then((appointment) => {
        if (!appointment)
          return responses.notFound(res, { error: "Cita no encontrada" });

        return responses.success(res, { appointment: appointment });
      })
      .catch((err) => {
        console.log(err);

        if (err instanceof PrismaClientKnownRequestError) {
          if (err.code == "P2025")
            return responses.notFound(res, { error: "Cita no encontrada" });
        }

        return responses.internalError(res, { error: "Internal Server Error" });
      });
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
