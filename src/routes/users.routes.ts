import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const userRouter = Router();
const upload = multer(uploadConfig);

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

userRouter.patch('/avatar', ensureAuthenticated, upload.single('file'), async (req, res) => {
  return res.status(200).json({ message: 'Avatar updated successfully' });
})

export default userRouter;
