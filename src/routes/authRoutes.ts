import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { signupSchema, loginSchema } from '../validations/authValidation';
import { AuthController } from '../controllers/authController';
const router = Router();

router.post('/signup', validate(signupSchema), AuthController.signup);
router.post('/login', validate(loginSchema), AuthController.login);
export default router;
