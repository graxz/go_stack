import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from '../config/auth';

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Unauthorization");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decode = verify(token, authConfig.jwt.secret);

    return next();
  } catch {
    throw new Error("Unauthorization");
  }
}
