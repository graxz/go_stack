import { getRepository } from 'typeorm';
import path from 'path'
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User'
import AppError from '../errors/AppError'

interface Request {
  user_id: string;
  avatar: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatar }: Request ): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ id: user_id });

    if (!user) {
      throw new AppError('Unauthorized', 401);
    }

    if (user.avatar) {
      const userAvatarPath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarExist = await fs.promises.stat(userAvatarPath)

      if (userAvatarExist) {
        await fs.promises.unlink(userAvatarPath);
      }
    }

    user.avatar = avatar;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService
