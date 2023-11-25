import { prisma } from "../../../persistence/prisma/client";

export async function getAllServicesService(page: number, size: number) {
  const services = await prisma.service.findMany({
    skip: size * (page - 1),
    take: size,
  });

    const count = await prisma.service.count();
    const pages = count / size;

    if (services.length == 0) return null;

    return {
      pagination: {
        total_records: count,
        current_page: page,
        total_pages: pages,
        next_page: page == pages ? null : page + 1,
        previous_page: page == 1 ? null : page - 1,
      },
      services: services,
    };
}
