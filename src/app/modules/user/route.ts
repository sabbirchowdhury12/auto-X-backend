import { ERole } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import { ProfileController } from './controller';

const router = Router();
const { CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN } = ERole;
const { getUsers, getUser, deleteUser } = ProfileController;

router
  .delete('/:id', auth(CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN), deleteUser)
  .get('/:id', auth(CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN), getUser)
  .get('/', auth(ADMIN, SUPER_ADMIN), getUsers);

export const UserRoutes = router;
