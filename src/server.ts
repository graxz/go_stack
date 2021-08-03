import 'reflect-metadata';

import express from 'express';
import routes from '.';

import './database'

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
