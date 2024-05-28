import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Employee from '../../models/employeeModel/employeeModel';
import Leave from '../../models/leaveModel/leave';


export const viewSingleEmployeeLeave = async(request:JwtPayload, response:Response) => {
    try{

        const leaveId = request.params.id
        const leave = await Leave.findOne({_id:leaveId})

        if(!leave){
            return response.status(404).json({
                message:'Leave Request not found',
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