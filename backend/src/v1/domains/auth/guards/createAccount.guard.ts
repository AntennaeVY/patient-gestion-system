import { NextFunction, Request, Response } from "express";

import responses from "../../../libs/http";
import {
  isValidEmail,
  isValidPhone,
  isValidImageURL,
  isValidId,
  isValidName,
  isValidLastName,
  isValidPassword,
  isValidCountry,
  isValidState,
  isValidCity,
  isValidStreet,
  isValidSuite,
  isValidBirthday,
  isValidGender,
} from "../../../libs/validation";

export function createAccountGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const fields = [];

    if (!isValidId(req.body.id)) 
      fields.push("id");

    if (!isValidName(req.body.name)) 
      fields.push("name");

    if (!isValidLastName(req.body.last_name))  
      fields.push("last_name");

    if (!isValidEmail(req.body.email)) 
      fields.push("email");

    if (!isValidPassword(req.body.password)) 
      fields.push("password");

    if (req.body.avatar_url && !isValidImageURL(req.body.avatar_url))
      fields.push("avatar_url");

    if (!req.body.contact_info) 
      fields.push("contact_info");

    const {
      country,
      state,
      city,
      street,
      suite,
      primary_phone,
      secondary_phone,
    } = req.body.contact_info;

    if (!isValidCountry(country)) 
      fields.push("country");

    if (!isValidState(state)) 
      fields.push("state");

    if (!isValidCity(city)) 
      fields.push("city");

    if (!isValidStreet(street)) 
      fields.push("street");

    if (suite && !isValidSuite(suite)) 
      fields.push("suite");

    if (!isValidPhone(primary_phone)) 
      fields.push("primary_phone");

    if (secondary_phone && !isValidPhone(secondary_phone))
      fields.push("secondary_phone");

    if (!isValidBirthday(req.body.birthday)) 
      fields.push("birthday");

    if (!isValidGender(req.body.gender)) 
      fields.push("gender");

    if (fields.length > 0)
      return responses.badRequest(res, {
        error: "El valor proporcionado es inválido",
        fields: fields,
      });
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }

  next();
}
