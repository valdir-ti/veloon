import { Request, Response } from "express";

import prisma from "../prisma";

export const historic = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user;

    if (!userId) {
      res.status(400).json({ error: "User not authenticated" });
      return;
    }

    if (isNaN(Number(userId))) {
      res.status(400).json({ error: "Invalid user ID" });
      return;
    }

    const history = await prisma.equalityCheck.findMany({
      where: {
        userId: Number(userId),
      },
    });

    const serializedHistory = history.map((item) => ({
      ...item,
      numero1: item.numero1.toString(),
      numero2: item.numero2.toString(),
    }));

    res.status(200).json(serializedHistory);
    return;
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
    return;
  }
};
