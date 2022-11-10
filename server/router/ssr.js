import express from 'express';
import { serverRouter } from '../../src/routers';
import { validateAccessToken, validateInit } from './api';

const router = express.Router();

router.get('*', async (req, res) => {
	console.log(req.url);
	if (req.url === '/__webpack_hmr' || req.url === '/favicon.ico') return;
	
	if (!serverRouter.checkAuthentication(req.path)) {
		res.send(serverRouter.serverRender(req.path));
	} else if (await validateAccessToken(req)) {
		if (await validateInit(req)) {
			console.log('init -s ');
			res.send(serverRouter.serverRender(req.path, true, true));
		} else {
			console.log('init -d ');
			res.send(serverRouter.serverRender(req.path, true, false));
		}
	} else {
		res.redirect('/sign-in');
	}
});

export default router;
