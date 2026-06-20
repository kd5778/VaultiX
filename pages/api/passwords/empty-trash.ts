import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Password from "@/models/password";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") return res.status(405).end();

  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  await dbConnect();

  const result = await Password.deleteMany({ userId, category: "Deleted" });

  res.status(200).json({
    message: "Trash emptied",
    deletedCount: result.deletedCount,
  });
}