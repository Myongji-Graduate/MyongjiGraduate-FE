import express from 'express';
import path from 'path';

import { serverRenderer } from './src/core/ssr';

const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.send(serverRenderer(req.path))
})

app.listen(3000, () => {
  console.log('listen to http://localhost:3000');
})