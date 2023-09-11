import { Request, Response } from 'express';
import { CREATED, OK } from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const { orderedBooks } = req.body;
    const { authorization } = req.headers;
    const user = jwtHelpers.verifyToken(
        authorization as string,
        config.jwt.secret as Secret
    );

    const result = await OrderService.createOrder(orderedBooks, user.userId);
    sendResponse(res, {
        statusCode: CREATED,
        success: true,
        message: '🆗 Order created successfully',
        data: result,
    });
});

const getOrders = catchAsync(async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const user = jwtHelpers.verifyToken(
        authorization as string,
        config.jwt.secret as Secret
    );

    const result = await OrderService.getOrders(user);
    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 Orders Data fetched successfully',
        data: result,
    });
});

const getOrderByOrderId = catchAsync(async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const { authorization } = req.headers;
    const user = jwtHelpers.verifyToken(
        authorization as string,
        config.jwt.secret as Secret
    );

    const result = await OrderService.getOrderByOrderId(
        orderId,
        user as JwtPayload
    );

    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 Order Data fetched successfully',
        data: result,
    });
});

export const OrderController = {
    createOrder,
    getOrders,
    getOrderByOrderId,
};
