import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createCategory = async (data: Category): Promise<Category> => {
    const category = await prisma.category.create({
        data,
    });
    return category;
};

const getAllCategory = async (): Promise<Category[]> => {
    const categories = await prisma.category.findMany();
    return categories;
};

const getCategoryById = async (id: string): Promise<Category | null> => {
    const category = await prisma.category.findUnique({
        where: {
            id,
        },
    });
    return category;
};

const updateCategory = async (
    id: string,
    data: Partial<Category>
): Promise<Category> => {
    const category = await prisma.category.update({
        where: {
            id,
        },
        data,
    });
    return category;
};

const deleteCategory = async (id: string): Promise<Category> => {
    const category = await prisma.category.delete({
        where: {
            id,
        },
    });
    return category;
};

export const CategoryService = {
    createCategory,
    getAllCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
