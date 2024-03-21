import { ERole } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { RentController } from './controller';
import { RentValidation } from './validation';

const router = Router();
const { CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN } = ERole;
const { ZCreateRent, ZUpdateRent } = RentValidation;
const { createRent, updateRent, deleteRent, getRent, getRents } =
  RentController;

router
  .post('/', validateRequest(ZCreateRent), createRent)
  .patch(
    '/:id',
    auth(CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN),
    validateRequest(ZUpdateRent),
    updateRent,
  )
  .delete('/:id', auth(ADMIN, SUPER_ADMIN), deleteRent)
  .get('/:id', auth(CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN), getRent)
  .get('/', auth(ADMIN, SUPER_ADMIN), getRents);

export const RentRoutes = router;
