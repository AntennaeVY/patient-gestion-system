import { NextFunction, Request, Response } from "express";
import { Role, AccountStatus } from "@prisma/client";

import responses from "../../../libs/http";
import { TokenPayload } from "../../../libs/token";
import { isValidDoctorCertificateURL, isValidDoctorSignatureURL, isValidDoctorSpecialization, isValidUUIDv4 } from "../../../libs/validation";

export function createDoctorGuard(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    req.body.role = Role.DOCTOR;
    req.body.status = AccountStatus.VERIFIED;

	const {certificate_url, signature_url, specialization, services} = req.body;

	const fields = [];

	if (!isValidDoctorCertificateURL(certificate_url))
		fields.push("certificate_url");

	if (!isValidDoctorSignatureURL(signature_url))
		fields.push("signature_url");

	if (!isValidDoctorSpecialization(specialization))
		fields.push("specialization");

  if (!services.every((id: string) => isValidUUIDv4(id)))
    fields.push("services")
	
    if (fields.length > 0)
      return responses.badRequest(res, {
        error: "El valor proporcionado es inválido",
        fields: fields,
      });

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
