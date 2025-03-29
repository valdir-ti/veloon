import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(403).json({ error: "Token is required" });
    return;
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "irmaossiameses",
    (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token" });
      }

      req.user = (decoded as { id: string }).id;
      next();
    }
  );
};
