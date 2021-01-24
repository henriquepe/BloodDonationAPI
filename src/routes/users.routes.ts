import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { nome, senha, email, cidade, estado, typeOfBlood } = request.body;

  const usersRepository = getRepository(User);
  const createUserService = new CreateUserService(usersRepository);

  try {
    const user = await createUserService.execute({
      nome,
      senha,
      email,
      cidade,
      estado,
      typeOfBlood,
    });

    return response.status(200).json(user);
  } catch (err) {
    return response.status(401).json({ error: err.message });
  }
});

export default usersRouter;
