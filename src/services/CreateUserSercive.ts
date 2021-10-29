import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserService {
  name: string;
  email: string;
  admin ?: boolean;
  password: string;
}

class CreateUserService {
  public async execute({  name, email, admin = false, password }: IUserService) {

    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error('Email incorrect')
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    })

    if (userAlreadyExists) {
      throw new Error ('User already exists')
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash
    })

    await usersRepository.save(user);

    return user;

  }
}

export { CreateUserService }