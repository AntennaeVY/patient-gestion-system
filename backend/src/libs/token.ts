import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRESIN = process.env.JWT_EXPIRESIN as string;

export type TokenPayload = {id: string, status: string, role: string};

export function createToken(payload: TokenPayload) {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRESIN });
  } catch (err) {
	console.log(err);

	return null;
  }
}

export function decodeToken(token: string) {
	try {
      return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (err) {
      console.log(err);

      return null;
    }
}

export function decodeAuthHeader(header: string) {
  return header.split(" ")[1];
}
