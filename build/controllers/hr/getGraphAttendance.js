"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphAttendance = void 0;
const attendance_1 = __importDefault(require("../../models/attendanceModel/attendance"));
const moment_1 = __importDefault(require("moment"));
const graphAttendance = async (request, response) => {
    try {
        const today = (0, moment_1.default)();
        const dayOfWeek = today.isoWeekday();
        let startOfWeek;
        let endOfWeek;
        if (dayOfWeek > 5) {
            // Weekend, fetch previous week's data
            startOfWeek = today.clone().subtract(1, 'weeks').startOf('isoWeek').isoWeekday(1);
            endOfWeek = startOfWeek.clone().add(4, 'days');
        }
        else {
            // Weekday, fetch current week's data up to today
            startOfWeek = today.clone().startOf('isoWeek').isoWeekday(1);
            endOfWeek = today.clone();
        }
        const attendanceData = await attendance_1.default.find({
            date: {
                $gte: startOfWeek.toDate(),
                $lte: endOfWeek.toDate()
            }
        });
        const result = attendanceData.reduce((acc, item) => {
            const day = (0, moment_1.default)(item.date).format('dddd'); // Get the day name
            if (!acc[day]) {
                acc[day] = {
                    late_comers: 0,
                    early_comers: 0
                };
            }
            const itemSTatus = item.clockInStatus;
            item.clockInStatus === 'late' ? acc[day].late_comers++ : acc[day].early_comers++;
            //   acc[day].early_comers += item.early_comers;
            return acc;
        }, {});
        let attendanceExtractor = Object.values(result);
        const lateComersArray = [];
        const earlyComersArray = [];
        attendanceExtractor.forEach(record => {
            lateComersArray.push(record.late_comers);
            earlyComersArray.push(record.early_comers);
        });
        return response.status(200).json({
            message: 'Graph Attendance data',
            lateComersArray,
            earlyComersArray
        });
    }
    catch (error) {
        response.status(500).json({ message: error.message });
    }
};
exports.graphAttendance = graphAttendance;
