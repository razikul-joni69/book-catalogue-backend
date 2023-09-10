import { Request, Response } from 'express';
import { CREATED, OK } from 'http-status';
import { Secret } from 'jsonwebtoken';
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

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderService.getAllOrders();
    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 All Orders fetched successfully',
        data: result,
    });
});

const getSpecificUserOrders = catchAsync(
    async (req: Request, res: Response) => {
        const { authorization } = req.headers;
        const user = jwtHelpers.verifyToken(
            authorization as string,
            config.jwt.secret as Secret
        );

        const result = await OrderService.getSpecificUserOrders(user?.userId);
        sendResponse(res, {
            statusCode: OK,
            success: true,
            message: '🆗 Specific User Orders fetched successfully',
            data: result,
        });
    }
);

export const OrderController = {
    createOrder,
    getAllOrders,
    getSpecificUserOrders,
};
