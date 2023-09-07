import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBook = async (data: Book): Promise<Book> => {
    const book = await prisma.book.create({
        data,
    });
    return book;
};

const getAllBooks = async (
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: 'asc' | 'desc'
): Promise<Book[] | any> => {
    console.log(page, limit);

    const books = await prisma.book.findMany({
        take: limit,
        skip: (page - 1) * limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });

    const total = await prisma.book.count();
    return {
        meta: {
            page,
            size: limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
        data: books,
    };
};

const getBookById = async (id: string): Promise<Book | null> => {
    const book = await prisma.book.findUnique({
        where: {
            id,
        },
    });
    return book;
};

const getBooksByCategoryId = async (
    page: number,
    limit: number,
    sortBy: string,
    sortOrder: 'asc' | 'desc',
    categoryId: string
): Promise<any | Book[]> => {
    const books = await prisma.book.findMany({
        where: {
            categoryId,
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });

    const total = await prisma.book.count({
        where: {
            categoryId,
        },
    });

    return {
        meta: {
            page,
            size: limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
        data: books,
    };
};

const updateBook = async (id: string, data: Partial<Book>): Promise<Book> => {
    const book = await prisma.book.update({
        where: {
            id,
        },
        data,
    });
    return book;
};

const deleteBook = async (id: string): Promise<Book> => {
    const book = await prisma.book.delete({
        where: {
            id,
        },
    });
    return book;
};

export const BookService = {
    createBook,
    getAllBooks,
    getBookById,
    getBooksByCategoryId,
    updateBook,
    deleteBook,
};
