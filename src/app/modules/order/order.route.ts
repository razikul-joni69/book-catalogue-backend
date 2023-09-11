import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';
const router = express.Router();

router.post(
    '/create-order',
    auth(ENUM_USER_ROLE.CUSTOMER),
    OrderController.createOrder
);
router.get(
    '/get-all-orders',
    auth(ENUM_USER_ROLE.ADMIN),
    OrderController.getAllOrders
);
router.get(
    '/',
    auth(ENUM_USER_ROLE.CUSTOMER),
    OrderController.getSpecificUserOrders
);
// TODO: FIXIT: now working. not hitting the route
router.get(
    '/:orderId/test ',
    // auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
    OrderController.getOrderByOrderId
);

export const OrderRoutes = router;
