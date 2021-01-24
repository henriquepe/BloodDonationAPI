import { Repository } from 'typeorm';
import { uuid } from 'uuidv4';
import { hash } from 'bcryptjs';
import User from '../models/User';

interface CreateUserData {
  nome: string;
  email: string;
  senha: string;
  cidade: string;
  estado: string;
  typeOfBlood: string;
}

export default class CreateUserService {
  constructor(private usersRepository: Repository<User>) {
    this.usersRepository = usersRepository;
  }

  public async execute({
    nome,
    cidade,
    email,
    estado,
    senha,
    typeOfBlood,
  }: CreateUserData): Promise<User> {
    const userExists = await this.usersRepository.findOne({
      where: { email },
    });

    if (userExists) {
      throw new Error('Usuário já existe, utilize outro e-mail');
    }

    const passwordHashed = await hash(senha, 8);

    const user = {
      id: uuid(),
      nome,
      cidade,
      email,
      estado,
      senha: passwordHashed,
      typeOfBlood,
    };

    this.usersRepository.create(user);

    await this.usersRepository.save(user);

    return user;
  }
}
