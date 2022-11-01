import express from 'express';

import { serverRenderer } from '../../src/core/ssr';

const router = express.Router();

router.get('*', (req, res) => {
	if (req.url === '/__webpack_hmr') return;

	res.send(serverRenderer(req.path));
});

export default router;
