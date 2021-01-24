import { Repository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import auth from '../config/auth';

interface AuthenticateUserData {
  email: string;
  senha: string;
}

interface AuthenticationResponseData {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  constructor(private usersRepository: Repository<User>) {
    this.usersRepository = usersRepository;
  }

  public async execute({
    email,
    senha,
  }: AuthenticateUserData): Promise<AuthenticationResponseData> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Usuário não existe, por favor crie uma conta.');
    }

    const passwordMatch = await compare(senha, user.senha);

    if (!passwordMatch) {
      throw new Error('E-mail ou senha inválido, tente novamente.');
    }

    const token = sign({}, auth.secret, {
      expiresIn: auth.expiresIn,
      subject: user.id,
    });

    return {
      user,
      token,
    };
  }
}
