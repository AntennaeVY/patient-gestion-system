import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import {
  isValidAppointmentStatus,
  isValidDate,
  isValidId,
  isValidReportURL,
  isValidRoom,
  isValidTime,
} from "../../../libs/validation";
import { UpdateAppointmentDto } from "../dtos/updateAppointment.dto";

export function updateAppointmentGuard(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const {
      patient_id,
      doctor_id,
      description,
      report_url,
      status,
      date,
      start_time,
      end_time,
      room,
    } = req.body as UpdateAppointmentDto;

    const fields = [];

    if (patient_id && !isValidId(patient_id)) 
      fields.push("patient_id");

    if (doctor_id && !isValidId(doctor_id)) 
      fields.push("doctor_id");

    if (description && description.length > 500) 
      fields.push("description");

    if (report_url && !isValidReportURL(report_url)) 
      fields.push("report_url");

    if (status && !isValidAppointmentStatus(status)) 
      fields.push("status");

    if (date && !isValidDate(date)) 
      fields.push("date");

    if (start_time && !isValidTime(start_time)) 
      fields.push("start_time");

    if (end_time && !isValidTime(end_time)) 
      fields.push("end_time");

    if (room && !isValidRoom(room)) 
      fields.push("room");

    if (fields.length > 0)
      return responses.badRequest(res, {
        error: "El valor proporcionado es inválido",
        fields: fields,
      });

    req.body.id = undefined;

    if (req.user?.role == "ADMIN" || req.user?.role == "RECEPCIONIST")
      return next();

    return responses.unauthorized(res, {
      error: "No tienes permiso para realizar esta accion",
    });
  } catch (err) {
    console.log(err);
    responses.internalError(res, { error: "Internal Server Error" });
  }
}
