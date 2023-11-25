import { Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import { getAllDoctorsService } from "../services/getAllDoctors.service";
import { Prisma } from "@prisma/client";

export function getAllDoctorsController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response
) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 5;

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

    getAllDoctorsService(page, size, options)
      .then((result) => {
        if (!result)
          return responses.notFound(res, "Doctores no encontrados");

        return responses.success(res, result);
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
