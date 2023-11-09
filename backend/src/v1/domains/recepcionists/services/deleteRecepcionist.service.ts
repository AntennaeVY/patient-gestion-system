import { exclude, prisma } from "../../../persistence/prisma/client";

export async function deleteRecepcionistService(id: string) {
  const recepcionist = await prisma.account.findUnique({
    where: { id: id, role: "RECEPCIONIST" },
    include: {
      contact: true,
    },
  });

  if (!recepcionist) return null;

  const accountPromise = prisma.account.delete({
    where: {
      id: id,
    },
  });

  const contactPromise = prisma.contact.delete({
    where: {
      id: recepcionist.contact_info,
    },
  });

  await prisma.$transaction([accountPromise, contactPromise]);

  const recepcionistWithoutPassword = exclude(recepcionist, ["password"]);

  return recepcionistWithoutPassword;
}
