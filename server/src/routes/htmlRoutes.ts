import path from 'path';
import express, { Request, Response } from 'express';

const router = express.Router();

// Serve the index.html file
router.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

export default router;
