import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import AppError from '../errors/AppError'
import authConfig from '../config/auth';

interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Unauthorization", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decode = verify(token, authConfig.jwt.secret);

    const { sub } = decode as TokenPayload;

    request.user = {
      id: sub,
    }

    return next();
  } catch {
    throw new AppError("Unauthorization", 401);
  }
}
