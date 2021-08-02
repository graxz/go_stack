import { Request, Response } from 'express';

export function helloWord(req: Request, res: Response) {
  return res.json({ message: 'Hello World!' });
}