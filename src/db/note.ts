import { PrismaClient } from "@prisma/client";
import { set } from "date-fns";

export const getNotesForDate = async (
  prisma: PrismaClient,
  year: number,
  month: number,
  day: number
) => {

  return await prisma.note.findMany({
    include: {
      noteType: true,
    },
    where: {
      AND: [
        {
          targetDay: {
            equals: day,
          },
        },
        {
          targetMonth: {
            equals: month,
          },
        },
        {
          targetYear: {
            equals: year,
          },
        },
      ],
    },
    orderBy: { createdAt: "asc" },
  });
};
