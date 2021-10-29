import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
  email: string;
  password: string
}

class AuthenticateUserService {
  public async execute({ email, password }: IAuthenticateRequest){

    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email
    })

    if (!user) {
      throw new Error ('Email / Password Incorrect')
    }

    const passwordMath = await compare(password, user.password)

    if (!passwordMath) {
      throw new Error ('Email / Password Incorrect')
    }

    const token = sign({
      email: user.email
      },
      'b9516d04701ac7dc45696cab17870313',
      {
      subject: user.id,
      expiresIn: '1d'
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
