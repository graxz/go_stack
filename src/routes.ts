import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWord(req: Request, res: Response) {
  const user = createUser({
    name: 'John Doe',
    email: 'john@example.com',
    password: '12345678',
  });

  return res.json({ message: 'Hello World!' });
}