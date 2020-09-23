import { Router } from 'express';
import MainController from '../controllers/web/main.controller';

const router = Router();

router.get('/', MainController.index);

export default router;
