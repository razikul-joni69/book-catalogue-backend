import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../../config';
import prisma from '../../../shared/prisma';

const getAllUsers = async (): Promise<Partial<User>[]> => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });

    return users;
};

const getUserById = async (id: string): Promise<Partial<User> | null> => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return user;
};

const updateUser = async (
    id: string,
    data: Partial<User>
): Promise<Partial<User>> => {
    let hashedPassword;
    if (data?.password) {
        hashedPassword = await bcrypt.hash(
            data.password,
            Number(config.bycrypt_salt_rounds)
        );
    }
    data.password = hashedPassword;

    const user = await prisma.user.update({
        where: {
            id,
        },
        data,
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return user;
};

const deleteUser = async (id: string): Promise<Partial<User>> => {
    const result = await prisma.user.delete({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: false,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true,
        },
    });
    return result;
};

export const UserService = { getAllUsers, getUserById, updateUser, deleteUser };
