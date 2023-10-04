import { isValidHash } from "../../../libs/hash";
import { createToken } from "../../../libs/token";
import { prisma } from "../../../persistence/prisma/client";
import { LoginAccountDto } from "../dtos/loginAccount.dto";

export async function loginAccountService(loginDto: LoginAccountDto) {
  const { email, password } = loginDto;

  // Validate that account with that email exists
  const accountOrNull = await prisma.account.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      role: true,
      password: true,
      status: true,
    },
  });

  if (!accountOrNull || !isValidHash(password, accountOrNull.password))
    return { code: 404, data: "Combinación de correo y contraseña inválida" };

  if (accountOrNull.status == "UNVERIFIED")
    return {
      code: 401,
      data: "Cuenta pendiente por aprobación, contacta con un administrador",
    };

  // Return session token
  return {
    code: 200,
    data: createToken({
      id: accountOrNull.id,
      role: accountOrNull.role,
      status: accountOrNull.status,
    }),
  };
}
