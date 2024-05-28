"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeClockout = void 0;
const attendance_1 = __importDefault(require("../../models/attendanceModel/attendance"));
const helpersFunctions_1 = require("../../utilities/helpersFunctions");
const employeeClockout = async (request, response) => {
    try {
        const employeeId = request.user._id;
        const attendanceId = request.params.id;
        if (!attendanceId || attendanceId === "") {
            return response.status(400).json({
                message: "You have not clocked-in today"
            });
        }
        const checkAttendance = await attendance_1.default.findOne({ employeeId, _id: attendanceId });
        if (!checkAttendance) {
            return response.status(400).json({
                message: "You have not clockedIn today"
            });
        }
        if (checkAttendance.clockOutTime !== null) {
            return response.status(400).json({
                message: "You have already clocked out"
            });
        }
        if (!employeeId) {
            return response.status(400).json({
                message: "Login again to clock out"
            });
        }
        const today = new Date();
        const employeeCheckOutStatus = (0, helpersFunctions_1.checkClockOutTime)(today);
        await attendance_1.default.updateOne({ _id: attendanceId }, { $set: { clockOutTime: today, clockOutStatus: employeeCheckOutStatus } });
        const attestCheckOut = await attendance_1.default.findOne({ _id: attendanceId });
        if (!attestCheckOut) {
            return response.status(400).json({
                message: "Unable to clock out, try again"
            });
        }
        return response.status(200).json({
            message: "Clock-Out Successful, Good Bye!",
            checkOut: attestCheckOut
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: "Internal Server Error"
        });
    }
};
exports.employeeClockout = employeeClockout;
