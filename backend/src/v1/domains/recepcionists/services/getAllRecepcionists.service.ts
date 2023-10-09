import { exclude, prisma } from "../../../persistence/prisma/client";

export async function getAllRecepcionistsService(skip?: number, take?: number) {
  const recepcionists = await prisma.account.findMany({
    where: { role: "RECEPCIONIST" },
    include: { contact: true },
    skip: skip,
    take: take,
  });

  return recepcionists.map((recepcionist) =>
    exclude(recepcionist, ["password"])
  );
}
