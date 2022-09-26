import express from 'express';
import path from 'path';

import App from './src/app';
import { serverRenderer } from './src/core/ssr';

const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.send(serverRenderer(new App('app').render()))
})

app.listen(3000, () => {
  console.log('listen to http://localhost:3000');
})