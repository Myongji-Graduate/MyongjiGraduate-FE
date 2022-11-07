import express from 'express';
import { serverRouter } from '../../src/routers';
import { validateAccessToken } from './api';

const router = express.Router();

router.get('*', async (req, res) => {
	if (req.url === '/__webpack_hmr' || req.url === '/favicon.ico') return;

	if (await validateAccessToken(req)) {
		res.send(serverRouter.serverRender(req.path, true));
	} else if (serverRouter.checkAuthentication(req.path)) {
		res.redirect('/sign-in');
	} else {
		res.send(serverRouter.serverRender(req.path));
	}
});

export default router;
