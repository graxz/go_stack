import { Router } from 'express';

import CreateUserService from '../services/CreateUserService'

const userRouter = Router();

userRouter.post('/', async (req, res) => {
  try {
    const { name, password, email } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name, password, email
    });

    return res.status(201).json({ message: 'User created successfully', id: user.id });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
})

export default userRouter;
