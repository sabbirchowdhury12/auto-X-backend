import { ERole } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './controller';
import { AuthValidation } from './validation';

const router = Router();
const { CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN } = ERole;
const { ZLogin, ZRegister, ZChangePassword } = AuthValidation;
const { login, register, changePassword } = AuthController;

router
  .post('/login', validateRequest(ZLogin), login)
  .post('/register', validateRequest(ZRegister), register)
  .patch(
    '/change-password',
    auth(CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN),
    validateRequest(ZChangePassword),
    changePassword,
  );

export const AuthRoutes = router;
