import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import { getDoctorService } from "../services/getDoctor.service";
import { Prisma } from "@prisma/client";

export function getDoctorController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    let options:
      | { select: Prisma.AccountSelect }
      | { include: Prisma.AccountInclude };

    if (req.user?.role == "PATIENT")
      options = {
        select: {
          name: true,
          last_name: true,
          doctor: true,
        },
      };
    else
      options = {
        include: {
          contact: true,
          doctor: true,
        },
      };

    getDoctorService(id, options)
      .then((doctorOrNull) => {
        if (!doctorOrNull)
          return responses.notFound(res, { error: "Doctor no encontrado" });

        return responses.success(res, { doctor: doctorOrNull });
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
