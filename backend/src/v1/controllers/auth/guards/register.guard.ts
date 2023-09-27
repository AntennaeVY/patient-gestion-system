import { ResponseBody } from "../../../../libs/http";
import RegisterDto from "../dtos/register.dto";

const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const urlRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)\.(jpg|png)$/;
const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

export function registerGuard(registerDto: RegisterDto): ResponseBody {
  const { name, last_name, email, password, avatar_url, role, contact_info } =
    registerDto;

  if (typeof name !== "string" || name == "" || name.length > 50)
    return { success: false, response: { message: "Name is not valid" } };

  if (typeof last_name !== "string" || last_name == "" || last_name.length > 50)
    return { success: false, response: { message: "Last name is not valid" } };

  if (
    typeof email !== "string" ||
    email.length > 255 ||
    emailRegex.test(email) == false
  )
    return { success: false, response: { message: "Email is not valid" } };

  if (
    typeof password !== "string" ||
    password.length < 8 ||
    password.length > 255
  )
    return { success: false, response: { message: "Password is not valid" } };

  if (
    avatar_url &&
    (typeof avatar_url !== "string" || urlRegex.test(avatar_url) == false)
  )
    return { success: false, response: { message: "Avatar URL is not valid" } };

  if (role == "PATIENT") {
    if (!contact_info)
      return {
        success: false,
        response: { message: "Contact info is missing" },
      };

    const {
      country,
      state,
      city,
      street,
      suite,
      primary_phone,
      secondary_phone,
    } = contact_info;

    if (typeof country !== "string" || country == "" || country.length > 50)
      return {
        success: false,
        response: { message: "Country is not valid" },
      };

    if (typeof state !== "string" || state == "" || state.length > 50)
      return {
        success: false,
        response: { message: "State is not valid" },
      };

    if (typeof city !== "string" || city == "" || city.length > 50)
      return {
        success: false,
        response: { message: "City is not valid" },
      };

    if (typeof street !== "string" || street == "" || street.length > 255)
      return {
        success: false,
        response: { message: "Street is not valid" },
      };

    if (
      suite &&
      (typeof suite !== "string" || suite == "" || suite.length > 50)
    )
      return {
        success: false,
        response: { message: "Suite is not valid" },
      };

    if (
      typeof primary_phone !== "string" ||
      phoneRegex.test(primary_phone) == false
    )
      return {
        success: false,
        response: { message: "Primary phone is not valid" },
      };

    if (
      secondary_phone &&
      (typeof secondary_phone !== "string" ||
        phoneRegex.test(secondary_phone) == false)
    )
      return {
        success: false,
        response: { message: "Secondary phone is not valid" },
      };
  }
  
  return { success: true, response: { message: "" } };
}
