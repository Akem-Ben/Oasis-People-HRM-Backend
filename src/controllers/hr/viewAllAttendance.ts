import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Attendance from '../../models/attendanceModel/attendance';


export const allAttendanceHistories = async(request:JwtPayload, response:Response) => {
    try{
        const attendanceHistory = await Attendance.find({})

        if(attendanceHistory.length < 1){
            return response.status(404).json({
                message:'No attendanceHistory requests found',
            })
        }
        
        return response.status(200).json({
            message: 'attendanceHistory Requests found',
            attendanceHistory
        })

    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            message:'Internal Server Error'
        })
    }
}