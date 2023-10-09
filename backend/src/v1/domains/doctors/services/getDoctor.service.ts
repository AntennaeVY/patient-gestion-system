import { exclude, prisma } from "../../../persistence/prisma/client";

export async function getDoctorService(id: string, options: any) {
  const doctorOrNull = await prisma.account.findUnique({
    where: {
      id: id,
      role: "DOCTOR"
    },
    ...options
  });

  if (!doctorOrNull)
    return null;

  const doctorWithoutPassword = exclude(doctorOrNull, ["password"]);

  return doctorWithoutPassword;
}
