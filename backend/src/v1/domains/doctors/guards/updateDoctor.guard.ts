import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";

import responses from "../../../libs/http";
import {
  isValidDoctorCertificateURL,
  isValidDoctorSignatureURL,
  isValidDoctorSpecialization,
  isValidUUIDv4,
} from "../../../libs/validation";

export async function updateDoctorGuard(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const { certificate_url, signature_url, specialization, services } = req.body;

    const fields = [];

    if (certificate_url && !isValidDoctorCertificateURL(certificate_url))
      fields.push("certificate_url");

    if (signature_url && !isValidDoctorSignatureURL(signature_url))
      fields.push("signature_url");

    if (specialization && !isValidDoctorSpecialization(specialization))
      fields.push("specialization");

    if (services && !services.every((id: string) => isValidUUIDv4(id)))
      fields.push("services")

    if (fields.length > 0)
      return responses.badRequest(res, {
        error: "El valor proporcionado es inválido",
        fields: fields,
      });

    if (req.isAdmin) return next();

    req.body.id = undefined;
    req.body.role = undefined;
    req.body.created_at = undefined;

    if (req.user?.role == "RECEPCIONIST") return next();

    if (req.user?.id !== req.params.id)
      return responses.notFound(res, { error: "Doctor no encontrado" });

    req.body.status = undefined;

    return next();
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
