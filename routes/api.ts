// api.ts
import registerController from '../controllers/register.controller';
import loginController from '../controllers/login.controller';
import { Router } from 'express';

const router = Router();

router.post("/register", registerController.handle);
router.post("/login", loginController.handle);

export default router;