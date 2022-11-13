import express from 'express';
import { serverRouter } from '../../src/routers';
import { validateAccessToken, validateInit } from './api';

const router = express.Router();

router.get('*', async (req, res) => {
	if (req.url === '/__webpack_hmr' || req.url === '/favicon.ico') return;

	res.send(serverRouter.serverRender(req.path));
});

export default router;
