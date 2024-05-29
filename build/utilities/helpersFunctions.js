"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.formatTimeFromISO = exports.confirmCheckIn = exports.checkClockOutTime = exports.checkClockInTime = exports.setHours = exports.generateEmployeeID = exports.tokenGenerator = exports.hashPassword = exports.generatePassword = void 0;
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
function formatTimeFromISO(isoString) {
    // Parse the ISO string to a Date object
    const date = new Date(isoString);
    // Extract hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    // Format minutes to always have two digits
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    // Combine into final formatted string
    const formattedTime = `${hours}:${minutesStr}${ampm}`;
    return formattedTime;
}
exports.formatTimeFromISO = formatTimeFromISO;
const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
exports.formatDate = formatDate;
