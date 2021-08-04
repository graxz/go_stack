import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({ email, password });

    return res.json({ message: 'Login successful', token });
  } catch (err) {
    return res.status(err.status_code).json({ error: err.message });
  }
})

export default sessionsRouter;
