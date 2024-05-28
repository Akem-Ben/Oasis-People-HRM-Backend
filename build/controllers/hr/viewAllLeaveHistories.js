"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewAllLeaveHistories = void 0;
const leave_1 = __importDefault(require("../../models/leaveModel/leave"));
const viewAllLeaveHistories = async (request, response) => {
    try {
        const leave = await leave_1.default.find({});
        if (leave.length < 1) {
            return response.status(404).json({
                message: 'No leave requests found',
            });
        }
        return response.status(200).json({
            message: 'Leave Requests found',
            leave
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
exports.viewAllLeaveHistories = viewAllLeaveHistories;
