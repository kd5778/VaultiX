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

  const {
    query: { id },
    body: { title, username, password, category, notes, cardNumber, expiry, cvv, originalCategory },
  } = req;

  if (!id) return res.status(400).json({ error: "Missing ID in URL" });

  await dbConnect();

  const updated = await Password.findOneAndUpdate(
    { _id: id, userId },
    { title, username, password, category, notes, cardNumber, expiry, cvv, originalCategory },
    { new: true }
  );

  if (!updated) return res.status(404).json({ error: "Password not found" });

  res.status(200).json(updated);
}
