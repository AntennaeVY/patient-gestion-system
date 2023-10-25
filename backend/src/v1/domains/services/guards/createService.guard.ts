import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";

import responses from "../../../libs/http";
import { isValidServiceName, isValidServicePrice, isValidServiceStatus, isValidTime } from "../../../libs/validation";

export async function createServiceGuard(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
	const {name, status, duration, price} = req.body;

	const fields: string[] = [];

	if (!isValidServiceName(name))
		fields.push("name");

	if (!isValidServiceStatus(status))
		fields.push("status");

	if (!isValidTime(duration))
		fields.push("duration");

	if (!isValidServicePrice(price))
		fields.push("price");

	if (fields.length > 0) 
		return responses.badRequest(res, {
      		error: "El valor proporcionado es inválido",
      		fields: fields,
    	});

	req.body.id = undefined;

    if (req.isAdmin || req.user?.role == "RECEPCIONIST") 
		return next();

    return responses.unauthorized(res, {
      error: "No tienes permiso para realizar esta accion",
    });
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }
}
