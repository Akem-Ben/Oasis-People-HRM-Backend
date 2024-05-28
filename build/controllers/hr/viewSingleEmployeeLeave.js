"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewSingleEmployeeLeave = void 0;
const leave_1 = __importDefault(require("../../models/leaveModel/leave"));
const viewSingleEmployeeLeave = async (request, response) => {
    try {
        const leaveId = request.params.id;
        const leave = await leave_1.default.findOne({ _id: leaveId });
        if (!leave) {
            return response.status(404).json({
                message: 'Leave Request not found',
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
exports.viewSingleEmployeeLeave = viewSingleEmployeeLeave;
