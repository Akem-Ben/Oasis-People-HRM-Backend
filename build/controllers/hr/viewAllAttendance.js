"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allAttendanceHistories = void 0;
const attendance_1 = __importDefault(require("../../models/attendanceModel/attendance"));
const allAttendanceHistories = async (request, response) => {
    try {
        const attendanceHistory = await attendance_1.default.find({});
        if (attendanceHistory.length < 1) {
            return response.status(404).json({
                message: 'No attendanceHistory requests found',
            });
        }
        return response.status(200).json({
            message: 'attendanceHistory Requests found',
            attendanceHistory
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
exports.allAttendanceHistories = allAttendanceHistories;
