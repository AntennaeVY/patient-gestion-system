import bcrypt from "bcryptjs";

export function hashString(str: string): string {
	return bcrypt.hashSync(str);
}

export function isValidHash(str: string, hash: string): boolean {
	return bcrypt.compareSync(str, hash);
}
