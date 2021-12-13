import { PrismaClient } from "@prisma/client";

const fiscalYears = [
  {
    name: "2077",
    startDate: "2020-04-14",
    endDate: "2021-04-13",
  },
  {
    name: "2078",
    startDate: "2021-04-14",
    endDate: "2022-04-13",
  },
  {
    name: "2079",
    startDate: "2022-04-14",
    endDate: "2023-04-13",
  },
  {
    name: "2080",
    startDate: "2023-04-14",
    endDate: "2024-04-13",
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
