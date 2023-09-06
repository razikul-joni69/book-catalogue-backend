import { Request, Response } from 'express';
import { OK } from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await UserService.getAllUsers();
    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 Users fetched successfully',
        data: users,
    });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log(id);

    const user = await UserService.getUserById(id);
    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 User fetched successfully',
        data: user,
    });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserService.updateUser(id, req.body);
    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 User updated successfully',
        data: user,
    });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserService.deleteUser(id);
    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 User deleted successfully',
        data: user,
    });
});

export const UserController = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
