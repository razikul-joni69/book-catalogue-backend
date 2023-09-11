/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from '@prisma/client';
import { UNAUTHORIZED } from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

type OrderedBook = {
    bookId: string;
    quantity: number;
};
// TODO: Order Book is not working
const createOrder = async (
    orderedBooks: OrderedBook[],
    userId: string
): Promise<Order | any> => {
    const order = await prisma.order.create({
        data: {
            userId,
            orderedBooks, // Assign the JSON structure directly
        },
    });
    return order;
};

const getOrders = async (user: JwtPayload): Promise<Order[] | any> => {
    if (user.role === 'admin') {
        const orders = await prisma.order.findMany();
        return orders;
    } else if (user.role === 'customer') {
        const orders = await prisma.order.findMany({
            where: {
                userId: user.userId,
            },
        });

        return orders;
    }
};

const getOrderByOrderId = async (
    orderId: string,
    user: JwtPayload
): Promise<Order[]> => {
    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
        },
    });

    if (order?.userId === user?.userId || user?.role === 'admin') {
        const order = await prisma.order.findMany({
            where: {
                id: orderId,
            },
        });

        return order;
    } else {
        throw new ApiError(UNAUTHORIZED, 'Unauthorized Access');
    }
};

export const OrderService = {
    createOrder,
    getOrders,
    getOrderByOrderId,
};
