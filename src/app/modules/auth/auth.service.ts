/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NOT_FOUND, UNAUTHORIZED } from 'http-status';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import prisms from '../../../shared/prisma';

const createUser = async (payload: User): Promise<Partial<User>> => {
    const hashedPassword = await bcrypt.hash(
        payload.password,
        Number(config.bycrypt_salt_rounds)
    );
    payload.password = hashedPassword;
    const result = await prisms.user.create({
        data: payload,
    });

    const { password, ...responseData } = result;

    return responseData;
};

const loginUser = async (
    email: string,
    password: string
): Promise<string | null> => {
    const user = await prisms.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new ApiError(NOT_FOUND, 'User does not found');
    }

    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (!passwordMatch) {
        throw new ApiError(UNAUTHORIZED, 'Invalid password');
    }

    const { role, id: userId } = user;
    const accessToken = jwt.sign(
        { role, userId },
        config.jwt.secret as Secret,
        {
            expiresIn: config.jwt.expires_in,
        }
    );

    const refreshToken = jwt.sign(
        { role, userId },
        config.jwt.refresh_secret as Secret,
        {
            expiresIn: config.jwt.refresh_expires_in,
        }
    );

    return accessToken;
};

export const AuthService = { createUser, loginUser };
