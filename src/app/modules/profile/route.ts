import { ERole } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ProfileController } from './controller';
import { AuthValidation } from './validation';

const router = Router();
const { CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN } = ERole;
const { ZProfileUpdate } = AuthValidation;
const { getProfile, getProfiles, deleteProfile, updateProfile } =
  ProfileController;

router
  .patch(
    '/:id',
    auth(CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN),
    validateRequest(ZProfileUpdate),
    updateProfile,
  )
  .delete('/:id', auth(CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN), deleteProfile)
  .get('/:id', auth(CUSTOMER, DRIVER, ADMIN, SUPER_ADMIN), getProfile)
  .get('/', auth(ADMIN, SUPER_ADMIN), getProfiles);

export const ProfileRoutes = router;
