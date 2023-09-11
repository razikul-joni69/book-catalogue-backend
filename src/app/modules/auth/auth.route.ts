import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
const router = express.Router();

router.post(
    '/signup',
    validateRequest(AuthValidation.createUser),
    AuthController.createUser
);
router.post(
    '/signin',
    validateRequest(AuthValidation.loginUser),
    AuthController.loginUser
);

export const AuthRoutes = router;
