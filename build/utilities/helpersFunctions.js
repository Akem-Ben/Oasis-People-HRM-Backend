"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmCheckIn = exports.checkClockOutTime = exports.checkClockInTime = exports.setHours = exports.generateEmployeeID = exports.tokenGenerator = exports.hashPassword = exports.generatePassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generatePassword = (last_name) => {
    const newPassword = (last_name += Math.floor(1000 + Math.random() * 90000));
    return newPassword;
};
exports.generatePassword = generatePassword;
const hashPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcryptjs_1.default.genSalt(saltRounds);
    const hash = await bcryptjs_1.default.hash(password, salt);
    return hash;
};
exports.hashPassword = hashPassword;
const tokenGenerator = async (data) => {
    if (process.env.APP_SECRET) {
        return jsonwebtoken_1.default.sign(data, process.env.APP_SECRET, { expiresIn: `1d` });
    }
};
exports.tokenGenerator = tokenGenerator;
const generateEmployeeID = (oldCode) => {
    let newCode;
    if (oldCode.length === 0) {
        newCode = `OAS-EMP-10101`;
    }
    else {
        const oldCodeExtractor = oldCode.split("-")[2];
        newCode = `OAS-EMP-${Number(oldCodeExtractor) + 1}`;
    }
    return newCode;
};
exports.generateEmployeeID = generateEmployeeID;
const setHours = (date) => {
    const checkInDate = new Date(date);
    checkInDate.setHours(0, 0, 0, 0);
    return checkInDate;
};
exports.setHours = setHours;
const checkClockInTime = (clockInTime) => {
    const nineAM = new Date(clockInTime);
    nineAM.setHours(9, 0, 0, 0);
    if (clockInTime > nineAM) {
        return 'late';
    }
    else {
        return 'on-time';
    }
};
exports.checkClockInTime = checkClockInTime;
const checkClockOutTime = (clockOutTime) => {
    const fivePM = new Date(clockOutTime);
    const eightPM = new Date(clockOutTime);
    eightPM.setHours(20, 0, 0, 0); // Set the time to 8:00 PM
    fivePM.setHours(17, 0, 0, 0); // Set the time to 5:00 PM
    if (clockOutTime < fivePM) {
        return 'too early';
    }
    else if (clockOutTime > fivePM && clockOutTime < eightPM) {
        return 'on-time';
    }
    else {
        return 'late';
    }
};
exports.checkClockOutTime = checkClockOutTime;
const confirmCheckIn = (checkIns, today) => {
    const hasCheckedInToday = checkIns.some(checkIn => {
        const checkInDate = new Date(checkIn);
        checkInDate.setHours(0, 0, 0, 0);
        return checkInDate.getTime() === today.getTime();
    });
    return hasCheckedInToday;
};
exports.confirmCheckIn = confirmCheckIn;
// import { Request, Response } from "express";
// import { JwtPayload } from "jsonwebtoken";
// import Attendance from "../../models/attendanceModel/attendance";
// import { checkClockInTime, confirmCheckIn, setHours } from "../../utilities/helpersFunctions";
// import Employee from "../../models/employeeModel/employeeModel";
// import Leave from "../../models/leaveModel/leave";
// export const employeeRequestLeave = async (request: JwtPayload, response: Response) => {
//     try {
//         const employeeId = request.user._id;
//         const { startDate, endDate } = request.body;
//         if (!employeeId) {
//             return response.status(400).json({
//                 message: "Login again to clock in"
//             });
//         }
//         // Fetch the employee details
//         const employeeArr = await Employee.find({ _id: employeeId });
//         const employee = employeeArr[0];
//         // Check if the employee has used all their leave days
//         if (employee.usedLeaveDays === employee.leaveDaysGiven || employee.totalDaysLeft === 0) {
//             return response.status(400).json({
//                 message: "You have used all your leave days for the year, please reach out to HR if you need more days"
//             });
//         }
//         // Check if the start date is at least 3 days from the current date
//         const currentDate = new Date();
//         const startLeaveDate = new Date(startDate);
//         const endLeaveDate = new Date(endDate);
//         const threeDaysNotice = new Date();
//         threeDaysNotice.setDate(currentDate.getDate() + 3);
//         if (startLeaveDate < threeDaysNotice) {
//             return response.status(400).json({
//                 message: "You must give at least 3 days notice for leave requests"
//             });
//         }
//         // Check if the total leave duration exceeds 21 days
//         const totalLeaveDays = (endLeaveDate.getTime() - startLeaveDate.getTime()) / (1000 * 3600 * 24) + 1;
//         if (totalLeaveDays > 21) {
//             return response.status(400).json({
//                 message: "Leave request should not exceed 21 days"
//             });
//         }
//         // Check if the requested leave days exceed the remaining leave days
//         if (totalLeaveDays > employee.totalDaysLeft) {
//             return response.status(400).json({
//                 message: `You only have ${employee.totalDaysLeft} leave days left`
//             });
//         }
//         // Create a new leave request
//         const newLeaveRequest = await Leave.create({
//             userId: employeeId,
//             requestDate: new Date(),
//             startDate: startLeaveDate,
//             endDate: endLeaveDate,
//             status: "Pending",
//             totalDays: totalLeaveDays,
//             daysUsed: employee.usedLeaveDays + totalLeaveDays,
//             daysLeft: employee.totalDaysLeft - totalLeaveDays,
//         });
//         // Update the employee's leave details
//         employee.usedLeaveDays += totalLeaveDays;
//         employee.totalDaysLeft -= totalLeaveDays;
//         await employee.save();
//         return response.status(200).json({
//             message: "Leave request submitted successfully",
//             leaveRequest: newLeaveRequest
//         });
//     } catch (error: any) {
//         console.log(error.message);
//         return response.status(500).json({
//             message: "Internal Server Error"
//         });
//     }
// }
