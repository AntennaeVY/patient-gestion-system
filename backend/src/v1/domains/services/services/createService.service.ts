import { prisma } from "../../../persistence/prisma/client";
import { CreateServiceDto } from "../dtos/createService.dto";

export async function createServiceService(createServiceDto: CreateServiceDto) {
  const service = await prisma.service.create({ data: createServiceDto });

  return service;
}
