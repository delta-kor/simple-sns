import { Router } from 'express';
import CryptoController from '../controllers/api/crypto.controller';
import MemberController from '../controllers/api/member.controller';

const router = Router();

router.post('/signup', CryptoController.resolve, MemberController.signup);
router.post('/login', CryptoController.resolve, MemberController.login);

export default router;
