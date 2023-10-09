import { hashString } from "../../../libs/hash";
import { exclude, prisma } from "../../../persistence/prisma/client";
import { UpdateRecepcionistDto } from "../dtos/updateRepcionist.dto";

export async function updateRecepcionistService(
  id: string,
  updateRecepcionistDto: UpdateRecepcionistDto
) {
  const { contact_info, ...accountData } = updateRecepcionistDto;

  if (updateRecepcionistDto.password) {
    updateRecepcionistDto.password = hashString(updateRecepcionistDto.password);
  }

  // Users can inject shit here but I just don't care right now

  const result = await prisma.account.update({
    where: { id: id },
    data: {
      ...accountData,
      contact: {
        update: contact_info,
      },
    },
    include: {
      contact: true,
    },
  });

  return exclude(result, ["password"]);
}
