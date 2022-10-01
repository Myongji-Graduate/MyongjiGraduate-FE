import express from 'express';
import path from 'path';

import { serverRenderer } from './src/core/ssr';

const __dirname = path.resolve();

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.client.js');

  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(webpackHotMiddleware(compiler));
}


app.use(express.static(path.join(__dirname, 'dist')));


app.get('*', (req, res) => {
  if (req.url === "/__webpack_hmr") return;

  res.send(serverRenderer(req.path))
})

app.listen(3001, () => {
  console.log('listen to http://localhost:3001');
})