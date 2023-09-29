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
      .then(({ code, data }) => {
        if (code == 404) 
			return responses.notFound(res, { error: data });

        return responses.success(res, { account: data });
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
