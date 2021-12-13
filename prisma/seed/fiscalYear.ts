import { PrismaClient } from "@prisma/client";

const fiscalYears = [
  {
    name: "2077",
    startDate: new Date(2020, 3, 14),
    endDate: new Date(2021, 3, 13),
  },
  {
    name: "2078",
    startDate: new Date(2021, 3, 14),
    endDate: new Date(2022, 3, 13),
  },
  {
    name: "2079",
    startDate: new Date(2022, 3, 14),
    endDate: new Date(2023, 3, 13),
  },
  {
    name: "2080",
    startDate: new Date(2023, 3, 14),
    endDate: new Date(2024, 3, 13),
  },
];

export default async function seedFiscalYear(prisma: PrismaClient) {
  await prisma.fiscalYear.createMany({
    data: fiscalYears.map(({ name, startDate, endDate }) => ({
      name,
      startDate,
      endDate,
    })),
  });
}
