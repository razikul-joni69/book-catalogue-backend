import { z } from 'zod';

const createUser = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        email: z.string({
            required_error: 'Email is required',
        }),
        password: z.string({
            required_error: 'Password is required',
        }),
        role: z.enum(['admin', 'customer']).optional(),
        contactNo: z.string({
            required_error: 'Contact number is required',
        }),
        address: z.string({
            required_error: 'Address is required',
        }),
        profileImg: z.string({
            required_error: 'Profile image is required',
        }),
    }),
});

const loginUser = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required',
        }),
        password: z.string({
            required_error: 'Password is required',
        }),
    }),
});

export const AuthValidation = { createUser, loginUser };
