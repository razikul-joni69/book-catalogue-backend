import { Order } from '@prisma/client';
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

const getAllOrders = async (): Promise<Order[]> => {
    const orders = await prisma.order.findMany();
    return orders;
};

const getSpecificUserOrders = async (
    userId: string
): Promise<Order[] | any> => {
    const orders = await prisma.order.findMany({
        where: {
            userId,
        },
    });

    return orders;
};

const getOrderByOrderId = async (orderId: string): Promise<Order[] | any> => {
    const order = await prisma.order.findMany({
        where: {
            userId: orderId,
        },
    });

    return order;
};

export const OrderService = {
    createOrder,
    getAllOrders,
    getSpecificUserOrders,
    getOrderByOrderId,
};
