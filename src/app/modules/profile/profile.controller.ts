import { Request, Response } from 'express';
import { OK } from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const getProfile = catchAsync(async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const user = jwtHelpers.verifyToken(
        authorization as string,
        config.jwt.secret as Secret
    );

    const result = await ProfileService.getProfile(user?.userId);

    sendResponse(res, {
        statusCode: OK,
        success: true,
        message: '🆗 Profile fetched successfully',
        data: result,
    });
});

export const ProfileController = { getProfile };
