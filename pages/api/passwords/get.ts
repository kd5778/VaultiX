import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Password from "@/models/password";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  await dbConnect();

  const cutoff = new Date(Date.now() - THIRTY_DAYS_MS);
  await Password.deleteMany({
    userId,
    category: "Deleted",
    updatedAt: { $lt: cutoff },
  });

  const passwords = await Password.find({ userId });

  res.status(200).json(passwords);
}