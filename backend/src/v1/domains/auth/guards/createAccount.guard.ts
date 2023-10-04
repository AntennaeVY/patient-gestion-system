import { NextFunction, Request, Response } from "express";
import { Gender } from "@prisma/client";

import responses from "../../../libs/http";
import { isValidEmail, isValidPhone, isValidURL } from "../../../libs/validation";

export function createAccountGuard(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      id,
      name,
      last_name,
      email,
      password,
      avatar_url,
      contact_info,
      birthday,
      gender,
    } = req.body;

    const fields = [];

    // Id validation
    if (typeof id !== "string" || id == "" || id.length > 8) 
      fields.push("id");

    // Name validation
    if (typeof name !== "string" || name == "" || name.length > 50)
      fields.push("name");

    // Last name validation
    if (
      typeof last_name !== "string" ||
      last_name == "" ||
      last_name.length > 50
    )
      fields.push("last_name");

    // Email validation
    if (
      typeof email !== "string" ||
      email.length > 255 ||
      !isValidEmail(email)
    )
      fields.push("email");

    // Password validation
    if (
      typeof password !== "string" ||
      password.length < 8 ||
      password.length > 255
    )
      fields.push("password");

    // Avatar URL validation
    if (
      avatar_url &&
      (typeof avatar_url !== "string" ||
      !isValidURL(avatar_url))
    )
      fields.push("avatar_url");

    // Contact info validation
    if (!contact_info) fields.push("contact_info");

    const {
      country,
      state,
      city,
      street,
      suite,
      primary_phone,
      secondary_phone,
    } = contact_info;

    // Country validation
    if (typeof country !== "string" || country == "" || country.length > 50)
      fields.push("country");

    // State validation
    if (typeof state !== "string" || state == "" || state.length > 50)
      fields.push("state");

    // City validation
    if (typeof city !== "string" || city == "" || city.length > 50)
      fields.push("city");

    // Street validation
    if (typeof street !== "string" || street == "" || street.length > 255)
      fields.push("street");

    // Suite validation
    if (
      suite &&
      (typeof suite !== "string" || suite == "" || suite.length > 50)
    )
      fields.push("suite");

    // Primary phone validation
    if (
      typeof primary_phone !== "string" ||
      !isValidPhone(primary_phone)
    )
      fields.push("primary_phone");

    // Secondary phone validation
    if (
      secondary_phone &&
      (typeof secondary_phone !== "string" ||
        !isValidPhone(secondary_phone))
    )
      fields.push("secondary_phone");

    // Birthday validation
    const birthdayDate = new Date(birthday);

    if (isNaN(Number(birthdayDate))) 
      fields.push("birthday");

    // Gender validation
    if (!Object.values(Gender).includes(gender)) 
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
