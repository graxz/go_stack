import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const { user } = await authenticateUser.execute({ email, password });

    return res.status(200).json({ message: 'Login successful', user: { user } });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
})

export default sessionsRouter;
