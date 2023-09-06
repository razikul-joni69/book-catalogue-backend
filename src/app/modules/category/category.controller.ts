import { Request, Response } from 'express';
import { OK } from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryService.createCategory(req.body);
    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 Category created successfully',
        data: result,
    });
});

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategory();
    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 All Category fetched successfully',
        data: result,
    });
});

const getCategoryById = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryService.getCategoryById(req.params.id);
    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 Single Category fetched successfully',
        data: result,
    });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryService.updateCategory(
        req.params.id,
        req.body
    );
    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 Category updated successfully',
        data: result,
    });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryService.deleteCategory(id);
    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 Category deleted successfully',
        data: result,
    });
});

export const CategoryController = {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
