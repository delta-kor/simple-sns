import { Router } from 'express';
import CryptoController from '../controllers/api/crypto.controller';
import AuthController from '../controllers/api/auth.controller';

const router = Router();

router.post('/signup', CryptoController.resolve, AuthController.signup);
router.post('/login', CryptoController.resolve, AuthController.login);
router.post('/setup', CryptoController.resolve, AuthController.setup);

export default router;
