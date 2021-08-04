import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (req, res) => {
  try {
    const { name, password, email } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name, password, email
    });

    return res.json({ message: 'User created successfully', id: user.id });
  } catch (err) {
    return res.status(err.status_code).json({ error: err.message });
  }
})

userRouter.patch('/upload', ensureAuthenticated, upload.single('avatar'), async (req, res) => {
  const updateUserAvatar = new UpdateUserAvatarService();

  const user = await updateUserAvatar.execute({
    user_id: req.user.id,
    avatar: req.file.filename
  });

  return res.json({ message: 'Avatar updated successfully', avatar: user.avatar });
})

export default userRouter;
