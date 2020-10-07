import { Router } from 'express';
import MainController from '../controllers/web/main.controller';
import MemberController from '../controllers/web/member.controller';
import TicketController from '../controllers/web/ticket.controller';

const router = Router();

router.get('/', MainController.index);
router.get('/signup', TicketController.book, MemberController.signup);
router.get('/login', TicketController.book, MemberController.login);
router.get('/setup', TicketController.book, MemberController.setup);

export default router;
