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
    const skip = parseInt(req.query.skip as string) || undefined;
    const take = parseInt(req.query.take as string) || undefined;

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

    getAllDoctorsService(skip, take, options)
      .then((doctors) => {
        return responses.success(res, { doctors: doctors });
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
