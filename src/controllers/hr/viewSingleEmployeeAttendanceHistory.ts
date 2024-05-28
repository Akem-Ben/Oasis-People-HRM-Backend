import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import Leave from "../../models/leaveModel/leave";
import Attendance from "../../models/attendanceModel/attendance";

export const singleEmployeeAttendanceHistory = async (
  request: JwtPayload,
  response: Response
) => {
  try {
    const employeeId = request.params.id;

    const employeeAttendance = await Attendance.find({ employeeId });

    if (employeeAttendance.length < 1) {
      return response.status(404).json({
        message: "Employee has not clocked in ever",
      });
    }

    return response.status(200).json({
      message: "Employee Attendance History fetched",
      employeeAttendance
    });
  } catch (error: any) {
    console.log(error.message);
    return response.status(500).json({
      message: "Internal Server Error",
    });
  }
};
