import { exclude, prisma } from "../../../persistence/prisma/client";

export async function getRecepcionistService(id: string) {
  const recepcionistOrNull = await prisma.account.findUnique({
    where: {
      id: id,
      role: "RECEPCIONIST"
    },
    include: {
      contact: true,
      doctor: true
    }
  });

  if (!recepcionistOrNull) 
    return null;

  const doctorWithoutPassword = exclude(recepcionistOrNull, ["password"]);

  return doctorWithoutPassword;
}
