import { Gender } from "@prisma/client";

const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{7,15}$/;
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const imageUrlRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)\.(jpg|png)$/;

export function isValidPhone(phone: string): boolean {
  return phoneRegex.test(phone);
}

export function isValidEmail(email: string): boolean {
  if (
    typeof email !== "string" ||
    email.length > 255 ||
    !emailRegex.test(email)
  )
    return false;

  return true;
}

export function isValidImageURL(url: string): boolean {
  if (typeof url !== "string" || !imageUrlRegex.test(url)) return false;

  return true;
}

export function isValidId(id: string): boolean {
  if (typeof id !== "string" || id == "" || id.length > 8) 
    return false;

  return true;
}

export function isValidName(name: string): boolean {
  if (typeof name !== "string" || name == "" || name.length > 50) 
  	return false;

  return true;
}

export function isValidLastName(last_name: string): boolean {
  if (typeof last_name !== "string" || last_name == "" || last_name.length > 50)
    return false;

  return true;
}

export function isValidPassword(password: string): boolean {
  if (
    typeof password !== "string" ||
    password.length < 8 ||
    password.length > 255
  )
    return false;

  return true;
}

export function isValidCountry(country: string): boolean {
  if (typeof country !== "string" || country == "" || country.length > 50)
    return false;

  return true;
}

export function isValidState(state: string): boolean {
  if (typeof state !== "string" || state == "" || state.length > 50)
    return false;

  return true;
}

export function isValidCity(city: string): boolean {
  if (typeof city !== "string" || city == "" || city.length > 50) 
    return false;

  return true;
}

export function isValidStreet(street: string): boolean {
  if (typeof street !== "string" || street == "" || street.length > 255)
    return false;

  return true;
}

export function isValidSuite(suite: string): boolean {
  if (suite && (typeof suite !== "string" || suite == "" || suite.length > 50))
    return false;

  return true;
}

export function isValidBirthday(birthday: string): boolean {
  const birthdayDate = new Date(birthday);

  if (isNaN(Number(birthdayDate))) 
    return false;

  return true;
}

export function isValidGender(gender: string): boolean {
  if (!Object.values(Gender).includes(gender as Gender)) 
    return false;

  return true;
}
