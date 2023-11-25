import { exclude, prisma } from "../../../persistence/prisma/client";

export async function getAllRecepcionistsService(page: number, size: number) {
  const recepcionists = await prisma.account.findMany({
    where: { role: "RECEPCIONIST" },
    include: { contact: true },
    skip: size * (page - 1),
    take: size,
  });

  const count = await prisma.account.count({ where: { role: "RECEPCIONIST" } });
  const pages = count / size;

  if (recepcionists.length == 0) return null;

  const recepcionistsWithoutPassword = recepcionists.map((recepcionist) =>
    exclude(recepcionist, ["password"])
  );

  return {
    pagination: {
      total_records: count,
      current_page: page,
      total_pages: pages,
      next_page: page == pages ? null : page + 1,
      previous_page: page == 1 ? null : page - 1,
    },
    patients: recepcionistsWithoutPassword,
  };
}
