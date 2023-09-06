import { Request, Response } from 'express';
import { OK } from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BookService } from './book.service';

const createBook = catchAsync(async (req: Request, res: Response) => {
    const result = await BookService.createBook(req.body);
    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 Book created successfully',
        data: result,
    });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
    const result = await BookService.getAllBooks();
    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 All Books fetched successfully',
        data: result,
    });
});

const getBookById = catchAsync(async (req: Request, res: Response) => {
    const result = await BookService.getBookById(req.params.id);
    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 Book fetched successfully',
        data: result,
    });
});

const getBooksByCategoryId = catchAsync(async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const result = await BookService.getBooksByCategoryId(categoryId);
    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 Categorised Books fetched successfully',
        data: result,
    });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
    const result = await BookService.updateBook(req.params.id, req.body);
    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 Book updated successfully',
        data: result,
    });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookService.deleteBook(id);
    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 Book deleted successfully',
        data: result,
    });
});

export const BookController = {
    createBook,
    getAllBooks,
    getBookById,
    getBooksByCategoryId,
    updateBook,
    deleteBook,
};
