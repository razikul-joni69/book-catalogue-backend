"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.create({
        data,
    });
    return book;
});
const getAllBooks = (search, filteredData, page, limit, sortBy, sortOrder) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield prisma_1.default.book.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    author: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    genre: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
            ],
            AND: [
                {
                    price: {
                        gte: (filteredData === null || filteredData === void 0 ? void 0 : filteredData.minPrice)
                            ? parseFloat(filteredData === null || filteredData === void 0 ? void 0 : filteredData.minPrice.toString())
                            : undefined,
                    },
                },
                {
                    price: {
                        lte: (filteredData === null || filteredData === void 0 ? void 0 : filteredData.maxPrice)
                            ? parseFloat(filteredData === null || filteredData === void 0 ? void 0 : filteredData.maxPrice.toString())
                            : undefined,
                    },
                },
            ],
            categoryId: filteredData === null || filteredData === void 0 ? void 0 : filteredData.category,
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_1.default.book.count({
        where: {
            OR: [
                {
                    title: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    author: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    genre: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
            ],
            AND: [
                {
                    price: {
                        gte: (filteredData === null || filteredData === void 0 ? void 0 : filteredData.minPrice)
                            ? parseFloat(filteredData === null || filteredData === void 0 ? void 0 : filteredData.minPrice.toString())
                            : undefined,
                    },
                },
                {
                    price: {
                        lte: (filteredData === null || filteredData === void 0 ? void 0 : filteredData.maxPrice)
                            ? parseFloat(filteredData === null || filteredData === void 0 ? void 0 : filteredData.maxPrice.toString())
                            : undefined,
                    },
                },
            ],
            categoryId: filteredData === null || filteredData === void 0 ? void 0 : filteredData.category,
        },
    });
    return {
        meta: {
            page,
            size: limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
        data: books,
    };
});
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.findUnique({
        where: {
            id,
        },
    });
    return book;
});
const getBooksByCategoryId = (page, limit, sortBy, sortOrder, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield prisma_1.default.book.findMany({
        where: {
            categoryId,
        },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield prisma_1.default.book.count({
        where: {
            categoryId,
        },
    });
    return {
        meta: {
            page,
            size: limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
        data: books,
    };
});
const updateBook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.update({
        where: {
            id,
        },
        data,
    });
    return book;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma_1.default.book.delete({
        where: {
            id,
        },
    });
    return book;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getBookById,
    getBooksByCategoryId,
    updateBook,
    deleteBook,
};
