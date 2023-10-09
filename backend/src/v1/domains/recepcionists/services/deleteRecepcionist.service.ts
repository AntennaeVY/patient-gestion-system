import { exclude, prisma } from "../../../persistence/prisma/client";

export async function deleteRecepcionistService(id: string) {
  const recepcionist = await prisma.account.findUnique({
    where: { id: id, role: "RECEPCIONIST" },
    include: {
      contact: true,
    },
  });

  if (!recepcionist) return null;

  await prisma.account.deleteMany({
    where: { id: id, contact: { id: recepcionist.contact_info } },
  });

  const recepcionistWithoutPassword = exclude(recepcionist, ["password"]);

  return recepcionistWithoutPassword;
}
