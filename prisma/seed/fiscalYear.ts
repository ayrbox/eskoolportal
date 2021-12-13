import { PrismaClient } from "@prisma/client";

const fiscalYears = [
  {
    name: "2077",
    startDate: Date.UTC(2020, 3, 14),
    endDate: Date.UTC(2021, 3, 13),
  },
  {
    name: "2078",
    startDate: Date.UTC(2021, 3, 14),
    endDate: Date.UTC(2022, 3, 13),
  },
  {
    name: "2079",
    startDate: Date.UTC(2022, 3, 14),
    endDate: Date.UTC(2023, 3, 13),
  },
  {
    name: "2080",
    startDate: Date.UTC(2023, 3, 14),
    endDate: Date.UTC(2024, 3, 13),
  },
];

export default async function seedFiscalYear(prisma: PrismaClient) {
  await prisma.fiscalYear.createMany({
    data: fiscalYears.map(({ name, startDate, endDate }) => ({
      name,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    })),
  });
}
