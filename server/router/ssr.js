import express from 'express';
import { serverRouter } from '../../src/routers';
import { validateAccessToken, validateInit } from './api';

const router = express.Router();

router.get('*', async (req, res) => {
	if (req.url === '/__webpack_hmr' || req.url === '/favicon.ico') return;
	if (!serverRouter.checkAuthentication(req.path)) {
		res.send(serverRouter.serverRender(req.path));
	} else if (await validateAccessToken(req)) {
		if (await validateInit(req)) {
			res.send(serverRouter.serverRender(req.path, true, true));
		} else {
			res.send(serverRouter.serverRender(req.path, true, false));
		}
	} else {
		res.redirect('/sign-in');
	}
});

export default router;
