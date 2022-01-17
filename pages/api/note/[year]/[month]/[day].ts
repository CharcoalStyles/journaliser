// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Note, NoteType, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getNotesForDate } from "../../../../../src/db/note";

type Data = Array<
  Note & {
    noteType: NoteType;
  }
>;

type Slugs = {
  year: string;
  month: string;
  day: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  //@ts-ignore
  const { day, month, year }: Slugs = req.query;
  const notes = await getNotesForDate(
    prisma,
    Number.parseInt(year),
    Number.parseInt(month),
    Number.parseInt(day)
  );
  res.status(200).json(notes);
}
