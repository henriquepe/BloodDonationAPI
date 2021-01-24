import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, senha } = request.body;

  const usersRepository = getRepository(User);

  const authenticateUserService = new AuthenticateUserService(usersRepository);

  try {
    const { user, token } = await authenticateUserService.execute({
      email,
      senha,
    });

    return response.status(200).json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
