import { NextFunction, Request, Response } from "express";
import responses from "../../libs/http";
import { TokenPayload, decodeAuthHeader, decodeToken } from "../../libs/token";

export function isAuthMiddleware(
  req: Request & {user?: TokenPayload, isAdmin?: boolean},
  res: Response,
  next: NextFunction
) {
  try {
    const header = req.headers.authorization;

    if (!header)
      return responses.unauthorized(res, {
        error:
          "No se encontró la cabecera de autenticación, asegúrate de iniciar sesión primero",
      });

  const token = decodeAuthHeader(header);
	const payload = decodeToken(token);

	if (!payload)
      return responses.unauthorized(res, {
        error:
          "Token de autenticación inválido, asegúrate de iniciar sesión primero",
      }); 
	 
	req.user = payload;
	req.isAdmin = payload.role == "ADMIN";
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }

  next();
}
