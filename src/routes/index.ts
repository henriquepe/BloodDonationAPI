import { Router } from 'express';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/users', usersRouter);

routes.use('/users/sessions', sessionsRouter);

export default routes;
