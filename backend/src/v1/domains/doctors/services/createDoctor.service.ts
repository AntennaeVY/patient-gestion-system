import { hashString } from "../../../libs/hash";
import { exclude, prisma } from "../../../persistence/prisma/client";
import { CreateDoctorDto } from "../dtos/createDoctor.dto";

export async function createDoctorService(createDoctorDto: CreateDoctorDto) {
  const {
    contact_info,
    certificate_url,
    signature_url,
    specialization,
    services,
    ...accountData
  } = createDoctorDto;

  createDoctorDto.password = hashString(createDoctorDto.password);

  const connectServices = createDoctorDto.services.map((service_id) => {
    return {
      doctor_id_service_id: {
        doctor_id: accountData.id,
        service_id: service_id
      }
    };
  });

  // Users can inject shit here but I just don't care right now

  const doctor = await prisma.account.create({
    data: {
      ...accountData,
      contact: {
        create: contact_info,
      },
      doctor: {
        create: {
          id: accountData.id,
          certificate_url: certificate_url,
          signature_url: signature_url,
          specialization: specialization,
          services: {
            connect: connectServices
          }
        },
      },
    }
  });

  const doctorWithoutPassword = exclude(doctor, ["password"]);

  return doctorWithoutPassword;
}
