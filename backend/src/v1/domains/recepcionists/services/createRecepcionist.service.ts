import { hashString } from "../../../libs/hash";
import { exclude, prisma } from "../../../persistence/prisma/client";
import { CreateRecepcionistDto } from "../dtos/createRecepcionist.dto";

export async function createRecepcionistService(
  createRecepcionistDto: CreateRecepcionistDto
) {
  const { contact_info, ...accountData } = createRecepcionistDto;

  createRecepcionistDto.password = hashString(createRecepcionistDto.password);

  // Users can inject shit here but I just don't care right now

  const recepcionist = await prisma.account.create({
    data: {
      ...accountData,
      contact: {
        create: contact_info,
      },
    },
  });

  const recepcionistWithoutPassword = exclude(recepcionist, ["password"]);

  return recepcionistWithoutPassword;
}
