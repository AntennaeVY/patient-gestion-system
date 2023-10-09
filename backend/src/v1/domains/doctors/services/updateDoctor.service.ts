import { hashString } from "../../../libs/hash";
import { exclude, prisma } from "../../../persistence/prisma/client";
import { UpdateDoctorDto } from "../dtos/updateDoctor.dto";

export async function updateDoctorService(
  id: string,
  updateDoctorDto: UpdateDoctorDto
) {
  const {
    contact_info,
    certificate_url,
    signature_url,
    specialization,
    services,
    ...accountData
  } = updateDoctorDto;

  if (updateDoctorDto.password) {
    updateDoctorDto.password = hashString(updateDoctorDto.password);
  }

  let connectServices = {};

  if (updateDoctorDto.services)
    connectServices = {
      services: {
        deleteMany: {},
        connect: updateDoctorDto.services.map((service_id) => {
          return {
            doctor_id_service_id: {
              doctor_id: accountData.id,
              service_id: service_id,
            },
          };
        }),
      },
    };

  // Users can inject shit here but I just don't care right now

  const result = await prisma.account.update({
    where: { id: id },
    data: {
      ...accountData,
      contact: {
        update: contact_info,
      },
      doctor: {
        update: {
          certificate_url: certificate_url,
          signature_url: signature_url,
          specialization: specialization,
          ...connectServices,
        },
      },
    },
    include: {
      contact: true,
      doctor: true,
    },
  });

  return exclude(result, ["password"]);
}
