import { ERole } from '@prisma/client';
import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { VehicleController } from './controller';
import { VehicleValidation } from './validation';

const router = Router();
const { ADMIN, SUPER_ADMIN } = ERole;
const { ZCreateVehicle, ZUpdateVehicle } = VehicleValidation;
const {
  createVehicle,
  getVehicle,
  getVehicles,
  updateVehicle,
  availableVehicles,
} = VehicleController;

router
  .post(
    '/',
    auth(ADMIN, SUPER_ADMIN),
    validateRequest(ZCreateVehicle),
    createVehicle,
  )
  .patch(
    '/:id',
    auth(ADMIN, SUPER_ADMIN),
    validateRequest(ZUpdateVehicle),
    updateVehicle,
  )
  .get('/:id', getVehicle)
  .get('/', getVehicles)
  .get('/freeVehicle', availableVehicles);

export const VehicleRoutes = router;
