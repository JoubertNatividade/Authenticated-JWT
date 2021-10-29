import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

class ListUsersService {
  async execute(){
    const userService = getCustomRepository(UsersRepositories)

    const tags = await userService.find()

    return tags;
  }
}

export { ListUsersService };
