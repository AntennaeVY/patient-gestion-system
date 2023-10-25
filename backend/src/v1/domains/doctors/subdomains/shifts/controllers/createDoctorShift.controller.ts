import { Request, Response } from "express";
import { CreateDoctorShiftDto } from "../dtos/createDoctorShift.dto";
import { createDoctorShiftService } from "../services/createDoctorShift.service";
import responses from "../../../../../libs/http";

export function createDoctorShiftController(req: Request, res: Response) {
  try {
    const createDoctorShiftDto = req.body as CreateDoctorShiftDto;
	const doctor_id = req.params.id;

    createDoctorShiftService(doctor_id, createDoctorShiftDto)
      .then(() => {
        responses.created(res, { message: "Turno creado exitosamente" });
      })
      .catch((err) => {
        console.log(err);

        return responses.internalError(res, {
          error: "Internal Server Error",
        });
      });
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { message: "Internal Server Error" });
  }
}
