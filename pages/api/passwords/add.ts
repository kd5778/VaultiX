import type { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import Password from "@/models/password";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { userId } = getAuth(req);

  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  const {
    title,
    username,
    password,
    category,
    notes,
    expiry,
    cvv,
    cardNumber,
  } = req.body;

  await dbConnect();

  const newPass = await Password.create({
    userId,
    title,
    username,
    password,
    cardNumber,
    cvv,
    expiry,
    category,
    notes,
  });

  res.status(201).json(newPass);
}
