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
exports.OrderController = void 0;
const http_status_1 = require("http-status");
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_service_1 = require("./order.service");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderedBooks } = req.body;
    const { authorization } = req.headers;
    const user = jwtHelpers_1.jwtHelpers.verifyToken(authorization, config_1.default.jwt.secret);
    const result = yield order_service_1.OrderService.createOrder(orderedBooks, user.userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.CREATED,
        success: true,
        message: '🆗 Order created successfully',
        data: result,
    });
}));
const getOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    const user = jwtHelpers_1.jwtHelpers.verifyToken(authorization, config_1.default.jwt.secret);
    const result = yield order_service_1.OrderService.getOrders(user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.OK,
        success: true,
        message: '🆗 Orders Data fetched successfully',
        data: result,
    });
}));
const getOrderByOrderId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const { authorization } = req.headers;
    const user = jwtHelpers_1.jwtHelpers.verifyToken(authorization, config_1.default.jwt.secret);
    const result = yield order_service_1.OrderService.getOrderByOrderId(orderId, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.OK,
        success: true,
        message: '🆗 Order Data fetched successfully',
        data: result,
    });
}));
exports.OrderController = {
    createOrder,
    getOrders,
    getOrderByOrderId,
};
