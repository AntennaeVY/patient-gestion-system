import { NextFunction, Request, Response } from "express";

import responses from "../../../libs/http";
import {
  isValidEmail,
  isValidPhone,
  isValidImageURL,
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

import { TokenPayload } from "../../../libs/token";
import { getAccountService } from "../services/getAccount.service.";

export async function updateAccountGuard(
  req: Request & {user?: TokenPayload, isAdmin?: boolean},
  res: Response,
  next: NextFunction
) {
  try {
    if (req.isAdmin)
      return next();

    const userToUpdate = await getAccountService(req.params.id);

    if (!userToUpdate || userToUpdate.role == "ADMIN")
      return responses.notFound(res, { error: "Usuario no encontrado" });

    const fields = [];

    const {
        name, 
        last_name, 
        email, 
        password, 
        avatar_url, 
        birthday,
        gender
      } = req.body;

    if (name && !isValidName(name)) 
      fields.push("name");

    if (last_name && !isValidLastName(last_name)) 
      fields.push("last_name");

    if (email && !isValidEmail(email)) 
      fields.push("email");

    if (password && !isValidPassword(password))
      fields.push("password");

    if (avatar_url && !isValidImageURL(avatar_url))
      fields.push("avatar_url");

    if (birthday && !isValidBirthday(birthday)) 
      fields.push("birthday");

    if (gender && !isValidGender(gender)) 
      fields.push("gender");

    if (req.body.contact_info) {
        const {
          country,
          state,
          city,
          street,
          suite,
          primary_phone,
          secondary_phone,
        } = req.body.contact_info;

        if (country && !isValidCountry(country)) 
          fields.push("country");

        if (state && !isValidState(state)) 
          fields.push("state");

        if (city && !isValidCity(city)) 
          fields.push("city");

        if (street && !isValidStreet(street)) 
          fields.push("street");

        if (suite && !isValidSuite(suite)) 
          fields.push("suite");

        if (primary_phone && !isValidPhone(primary_phone)) 
          fields.push("primary_phone");

        if (secondary_phone && !isValidPhone(secondary_phone))
          fields.push("secondary_phone");

    }

    if (fields.length > 0)
      return responses.badRequest(res, {
        error: "El valor proporcionado es inválido",
        fields: fields,
      });
  } catch (err) {
    console.log(err);

    return responses.internalError(res, { error: "Internal Server Error" });
  }

  return next();
}
