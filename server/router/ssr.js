import express from 'express';
const router = express.Router();

import { serverRenderer } from '../../src/core/ssr';

router.get('*', (req, res) => {
  if (req.url === "/__webpack_hmr") return;

  res.send(serverRenderer(req.path))
})

export default router;