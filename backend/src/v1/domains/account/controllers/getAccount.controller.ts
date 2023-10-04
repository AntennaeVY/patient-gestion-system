import { Request, Response } from "express";
import { TokenPayload } from "../../../libs/token";
import responses from "../../../libs/http";
import { getAccountService } from "../services/getAccount.service.";

export function getAccountController(
  req: Request & { user?: TokenPayload; isAdmin?: boolean },
  res: Response
) {
  try {
    const { id } = req.params;

    getAccountService(id)
      .then((accountOrNull) => { 
        if (!accountOrNull)
			    return responses.notFound(res, { error: "Usuario no encontrado" });

        return responses.success(res, { account: accountOrNull });
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
