import { exclude, prisma } from "../../../persistence/prisma/client";

export async function getAccountService(id: string) {
  const accountOrNull = await prisma.account.findUnique({
    where: { id: id },
    include: { contact: true },
  });

  if (!accountOrNull) 
    return null;

  const accountWithoutPassword = exclude(accountOrNull, ["password"]);

  return accountWithoutPassword;
}
