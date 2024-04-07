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
  getAllVehicles,
} = VehicleController;

router
  .post(
    '/',
    auth(ADMIN, SUPER_ADMIN),
    validateRequest(ZCreateVehicle),
    createVehicle,
  )
  .get('/available', availableVehicles)
  .get('/dashboard', getAllVehicles)
  .patch(
    '/:id',
    auth(ADMIN, SUPER_ADMIN),
    validateRequest(ZUpdateVehicle),
    updateVehicle,
  )

  .get('/', getVehicles)
  .get('/:id', getVehicle);

export const VehicleRoutes = router;
