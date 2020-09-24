import { Router } from 'express';
import MainController from '../controllers/web/main.controller';
import MemberController from '../controllers/web/member.controller';

const router = Router();

router.get('/', MainController.index);
router.get('/signup', MemberController.signup);
router.get('/login', MemberController.login);

export default router;
