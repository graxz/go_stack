import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import User from '../models/User'

interface Request {
  email: string;
  password: string;
  name: string;
}

class CreateUserService {
  public async execute({ email, password, name }: Request): Promise<User> {
    const usersRepository = await getRepository(User)

    const checkUserExists = await usersRepository.findOne({ 
      where: { email }
    })

    if (checkUserExists) {
      throw new Error('User with this email already exists')
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    await usersRepository.save(user)
    return user
  }
}

export default CreateUserService;
