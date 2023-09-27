import { Request, Response } from "express";

import responses from "../../../libs/http";
import { registerGuard } from "./guards/register.guard";
import RegisterDto from "./dtos/register.dto";

export function registerController(req: Request, res: Response) {
  try {
    const registerDto = req.body as RegisterDto;
    const guard = registerGuard(registerDto);

    if (guard.success == false)
      return responses.badRequest(res, guard.response);

    // continue with service
  } catch (err) {
    return responses.internalError(res, { message: "Internal Server Error" });
  }
}
