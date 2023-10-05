import { hashString } from "../../../libs/hash";
import { exclude, prisma } from "../../../persistence/prisma/client";
import { UpdatePatientDto } from "../dtos/updatePatient.dto";

export async function updatePatientService(
  id: string,
  updatePatientDto: UpdatePatientDto
) {
  const { contact_info, ...accountData } = updatePatientDto;

  if (updatePatientDto.password) {
    updatePatientDto.password = hashString(updatePatientDto.password);
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
      contact: true
    }
  });

  return exclude(result, ["password"]);
}
