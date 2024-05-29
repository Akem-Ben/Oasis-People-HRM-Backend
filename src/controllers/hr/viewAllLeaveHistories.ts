import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Leave from '../../models/leaveModel/leave';


export const viewAllLeaveHistories = async(request:JwtPayload, response:Response) => {
    try{
        const leave = await Leave.find({})

        if(leave.length < 1){
            return response.status(404).json({
                message:'No leave requests found',
            })
        }
        
        return response.status(200).json({
            message: 'Leave Requests found',
            leave
        })

    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            message:'Internal Server Error'
        })
    }
}