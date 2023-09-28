import { exclude, prisma } from "../../../persistence/prisma/client";

export async function getAccountService(id: string) {
  const accountOrNull = await prisma.account.findUnique({
    where: { id: id },
    include: { contact: true },
  });

  if (!accountOrNull) 
    return { code: 404, data: "Usuario no encontrado" };

  const accountWithoutPassword = exclude(accountOrNull, ["password"]);

  return { code: 200, data: accountWithoutPassword };
}
