import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserSercive';


class CreateUserController {

  async handle( request: Request, response: Response ) {

    const { name, email, admin, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      admin,
      password
    })

    delete user.password;

    return response.status(201).json(user);

  }
}

export { CreateUserController }


