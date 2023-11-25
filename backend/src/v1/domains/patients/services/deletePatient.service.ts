import { exclude, prisma } from "../../../persistence/prisma/client";

export async function deletePatientService(id: string) {
  const patient = await prisma.account.findUnique({
    where: { id: id, role: "PATIENT" },
    include: {
      contact: true,
    },
  });

  if (!patient) return null;

  const accountPromise = prisma.account.delete({
    where: {
      id: id
    }
  })

  const contactPromise = prisma.contact.delete({
    where: {
      id: patient.contact_info
    }
  })

  const appointmentsPromise = prisma.appointment.deleteMany({
    where: {
      patient_id: id
    }
  })

  await prisma.$transaction([
    appointmentsPromise,
    accountPromise,
    contactPromise,
  ]);

  const patientWithoutPassword = exclude(patient, ["password"]);

  return patientWithoutPassword;
}
