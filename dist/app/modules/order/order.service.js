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
exports.OrderService = void 0;
const http_status_1 = require("http-status");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// TODO: Order Book is not working
const createOrder = (orderedBooks, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prisma_1.default.order.create({
        data: {
            userId,
            orderedBooks, // Assign the JSON structure directly
        },
    });
    return order;
});
const getOrders = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === 'admin') {
        const orders = yield prisma_1.default.order.findMany();
        return orders;
    }
    else if (user.role === 'customer') {
        const orders = yield prisma_1.default.order.findMany({
            where: {
                userId: user.userId,
            },
        });
        return orders;
    }
});
const getOrderByOrderId = (orderId, user) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield prisma_1.default.order.findFirst({
        where: {
            id: orderId,
        },
    });
    if ((order === null || order === void 0 ? void 0 : order.userId) === (user === null || user === void 0 ? void 0 : user.userId) || (user === null || user === void 0 ? void 0 : user.role) === 'admin') {
        const order = yield prisma_1.default.order.findMany({
            where: {
                id: orderId,
            },
        });
        return order;
    }
    else {
        throw new ApiError_1.default(http_status_1.UNAUTHORIZED, 'Unauthorized Access');
    }
});
exports.OrderService = {
    createOrder,
    getOrders,
    getOrderByOrderId,
};
