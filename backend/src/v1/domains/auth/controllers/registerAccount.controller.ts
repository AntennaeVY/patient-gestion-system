import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import responses from "../../../libs/http";
import AccountType from "../../../types";
import { registerAccountService } from "../services/registerAccount.service";

export function registerController(req: Request, res: Response) {
  try {
    const registerDto = req.body as AccountType;

    registerAccountService(registerDto)
      .then(() => {
        responses.created(res, { message: "Cuenta creada exitosamente" });
      })
      .catch((err) => {
        console.log(err);

        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          if (err.code == "P2002") {
            const fields = err.meta?.target;

            return responses.badRequest(res, {
              error: "El valor proporcionado ya se encuentra en uso",
              fields: fields,
            });
          }
        }

        return responses.internalError(res, {
          error: "Internal Server Error",
        });
      });

  } catch (err) {
    console.log(err);

    return responses.internalError(res, { message: "Internal Server Error" });
  }
}
