import { Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import Employee from '../../models/employeeModel/employeeModel';


export const viewEmployees = async(request:JwtPayload, response:Response) => {
    try{

        const employees = await Employee.find({})

        if(employees.length < 1){
            return response.status(404).json({
                message:'No employees available',
                employees
            })
        }
        return response.status(200).json({
            message: 'employees found',
            employees
        })
    }catch(error:any){
        console.log(error.message)
        return response.status(500).json({
            message:'Internal Server Error'
        })
    }
}