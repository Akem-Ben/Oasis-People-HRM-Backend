"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewPersonalAttendanceRecord = void 0;
const attendance_1 = __importDefault(require("../../models/attendanceModel/attendance"));
const viewPersonalAttendanceRecord = async (request, response) => {
    try {
        const userId = request.user._id;
        const attendance = await attendance_1.default.find({ employeeId: userId });
        if (attendance.length < 1) {
            return response.status(404).json({
                message: 'No attendance record found',
                attendance
            });
        }
        return response.status(200).json({
            message: 'attendance records found',
            attendance
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
exports.viewPersonalAttendanceRecord = viewPersonalAttendanceRecord;
