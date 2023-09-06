import { PrismaClient } from '@prisma/client';

const prisms = new PrismaClient({
    errorFormat: 'minimal',
});

export default prisms;
