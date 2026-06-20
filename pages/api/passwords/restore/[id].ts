import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Password from "@/models/password";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(405).end();

  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Missing ID" });

  await dbConnect();

  const existing = await Password.findOne({ _id: id, userId });
  if (!existing) return res.status(404).json({ error: "Password not found" });

  if (existing.category !== "Deleted") {
    return res.status(400).json({ error: "Item is not in Deleted" });
  }

  existing.category = existing.originalCategory || "All";
  existing.originalCategory = undefined;
  await existing.save();

  res.status(200).json({ message: "Password restored", item: existing });
}