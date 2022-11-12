import express from 'express';
import path from 'path';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import apiRouter from './router/api';
import ssrRouter from './router/ssr';


const __dirname = path.resolve();

const app = express();
app.use(compression());

if (process.env.NODE_ENV !== 'production') {
	const webpack = require('webpack');
	const webpackConfig = require('../webpack.client.js');

	const webpackDevMiddleware = require('webpack-dev-middleware');
	const webpackHotMiddleware = require('webpack-hot-middleware');

	const compiler = webpack(webpackConfig);

	app.use(
		webpackDevMiddleware(compiler, {
			publicPath: webpackConfig.output.publicPath,
		})
	);

	app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.use(cookieParser());

app.use(express.static('public'));
app.use('/api', apiRouter);
app.use('/', ssrRouter);


app.listen(3000, () => {
	console.log('listen to http://localhost:3000');
});
