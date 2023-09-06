import { Book } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createBook = async (data: Book): Promise<Book> => {
    const book = await prisma.book.create({
        data,
    });
    return book;
};

const getAllBooks = async (): Promise<Book[]> => {
    const books = await prisma.book.findMany();
    return books;
};

const getBookById = async (id: string): Promise<Book | null> => {
    const book = await prisma.book.findUnique({
        where: {
            id,
        },
    });
    return book;
};

const getBooksByCategoryId = async (categoryId: string): Promise<Book[]> => {
    const books = await prisma.book.findMany({
        where: {
            categoryId,
        },
    });

    return books;
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
