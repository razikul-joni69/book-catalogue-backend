import { Request, Response } from 'express';
import { OK } from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await AuthService.createUser(data);
    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 User created successfully',
        data: result,
    });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await AuthService.loginUser(email, password);

    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 User logged in successfully',
        token: result,
    });
});

export const AuthController = { createUser, loginUser };
