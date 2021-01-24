import './database';
import * as Express from 'express';
import * as cors from 'cors';
import routes from './routes';

const app = Express();

app.use(cors());

app.use(Express.json());

app.use(routes);

const PORT = 3010;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
