import {Request, Response} from "express";
import { JwtPayload } from "jsonwebtoken";
import Attendance from "../../models/attendanceModel/attendance";
import { checkClockInTime, checkClockOutTime, confirmCheckIn, setHours } from "../../utilities/helpersFunctions";

export const employeeClockout = async(request:JwtPayload, response:Response) => {
    try {

        const employeeId = request.user._id;

        const attendanceId = request.params.id;

        if(!attendanceId || attendanceId === ""){
            return response.status(400).json({
                message: "You have not clocked-in today"
            });
        }

        const checkAttendance:any = await Attendance.find({employeeId, _id:attendanceId});

        if(checkAttendance.length === 0){
            return response.status(400).json({
                message: "You have not clockedIn today"
            });
        }

        if(checkAttendance[0].clockOutTime !== null){
            return response.status(400).json({
                message: "You have already clocked out"
            });
        }
        
        if(!employeeId){
            return response.status(400).json({
                message: "Login again to clock out"
            });
        }

        const today = new Date();

        const employeeCheckOutStatus = checkClockOutTime(today);

        await Attendance.updateOne({ _id: attendanceId }, { $set: { clockOutTime: today, clockOutStatus: employeeCheckOutStatus } });

        const attestCheckOut = await Attendance.find({_id:attendanceId});

        if(!attestCheckOut){
            return response.status(400).json({
                message: "Unable to clock out, try again"
            });
        }
        return response.status(200).json({
            message: "Clock-Out Successful, Good Bye!",
            checkOut: attestCheckOut
        });

    } catch (error:any) {
        console.log(error.message);
        return response.status(500).json({
            message: "Internal Server Error"
        });
    }
}
