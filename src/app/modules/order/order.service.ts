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
    const newOrder = await prisma.order.create({
        data: {
            userId,
            orderedBooks: {
                create: orderedBooks.map(book => ({
                    quantity: book.quantity,
                    book: {
                        connect: {
                            id: book.bookId,
                        },
                    },
                })),
            },
            status: 'pending',
            createdAt: new Date(),
        },
    });

    return newOrder;
    // const order = await prisma.order.create({
    //     data,
    // });
    // return order;
};

const getAllOrders = async (): Promise<Order[]> => {
    const orders = await prisma.order.findMany();
    return orders;
};

const getAllUserOrders = async (id: string): Promise<Order[]> => {
    const orders = await prisma.order.findMany({
        where: {
            userId: id,
        },
    });
    return orders;
};

export const OrderService = { createOrder, getAllOrders, getAllUserOrders };
