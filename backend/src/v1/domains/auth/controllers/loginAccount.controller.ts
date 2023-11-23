import { Request, Response } from "express";
import { LoginAccountDto } from "../dtos/loginAccount.dto";
import { loginAccountService } from "../services/loginAccount.service";
import responses from "../../../libs/http";
import { TokenPayload, decodeToken } from "../../../libs/token";

export function loginAccountController(req: Request, res: Response) {
  try {
    const loginDto = req.body as LoginAccountDto;

    loginAccountService(loginDto)
      .then(({ code, data }) => {
        if (code == 404)
          return responses.notFound(res, {
            error: data,
          });
        else if (code == 401)
          return responses.unauthorized(res, {
            error: data,
          });

        if (data) {
          const payload = decodeToken(data) as TokenPayload;
          res.setHeader("X-Role", payload.role);
        }
      
        return responses.success(res, { token: data });
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
