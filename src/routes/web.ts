import { Router } from 'express';
import TicketController from '../controllers/web/ticket.controller';
import MainController from '../controllers/web/main.controller';
import MemberController from '../controllers/web/member.controller';

const router = Router();

router.get('/', MainController.index);
router.get('/signup', TicketController.book, MemberController.signup);
router.get('/setup', TicketController.book, MemberController.setup);
router.get('/login', TicketController.book, MemberController.login);
router.get('/logout', MemberController.logout);

export default router;
