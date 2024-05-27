import { Request, Response } from 'express';import HR from '../../models/hrModel/hrModel';
import { generateEmployeeID, generatePassword, hashPassword } from '../../utilities/helpersFunctions';
import { sendMail } from '../../utilities/emailNotification';
import { registerEmployeeSchema } from '../../validators/validators';
import Employee, { IEmployee } from '../../models/employeeModel/employeeModel';


export const createEmployee = async(request:Request,response:Response) => {
    try {

        // const {
        //     firstName,
        //     lastName,
        //     email,
        //     middleName,
        //     nextOfKin,
        //     phone,
        //     image,
        //     gender,
        //     birthDate,
        //     maritalStatus,
        //     nationality,
        //     homeAddress,
        //     city,
        //     district,
        //     zipCode,
        //     department,
        //     designation,
        //     employeeType,
        //     contractType,
        //     workingDays,
        //     hireDate,
        //     socialAccounts,
        //     bankBranch,
        //     bankAccountNumber,
        //     accountName 
        // } = request.body;

        // console.log('hi',request.body)
        const validateInput = await registerEmployeeSchema.validateAsync(request.body);        

        if (validateInput.error) {
          return response.status(400).json({
            Error: validateInput.error.details[0].message,
          });
        }

        const findAdmin = await HR.findOne({email:request.body.email});

        if(findAdmin){
            return response.status(400).json({
                message: "This user exists as a HR",
                findAdmin
            });
        }

        const findEmployee = await Employee.findOne({email:request.body.email});

        if(findEmployee){
            return response.status(400).json({
                message: "This employee already exists",
                findEmployee
            });
        
        }

        const newPassword = generatePassword(request.body.lastName);

        const hashedPassword = await hashPassword(newPassword);

        const allEmployees: any = await Employee.find({})
      
          let lastEmployeeId: string = "";
          let newEmployeeId: string = "";
      
          if (allEmployees.length === 0) {
            newEmployeeId = generateEmployeeID(lastEmployeeId);
          } else {
            let agentIds: number[] = allEmployees.map((employee: IEmployee) => {
              const max_id_number = employee.employeeId.split("-")[2];
              return Number(max_id_number);
            });
            let sortedEmployeeIds: number[] = agentIds.sort(
              (id1: number, id2: number) => id2 - id1
            );
            lastEmployeeId = sortedEmployeeIds[0].toString();
            newEmployeeId = generateEmployeeID(lastEmployeeId);
          }

        await Employee.create({
            ...request.body,
            password: hashedPassword,
            workEmail: request.body.email,
            employeeId: newEmployeeId,
            image: request.file?.path,
            isManager: false,
            hireDate: new Date(),
            leaveDaysGiven: 21,
            socialAccounts: JSON.parse(request.body.socialAccounts),
            workingDays: JSON.parse(request.body.workingDays),
            usedLeaveDays: 0,
            totalDaysLeft: 21
        });

        const checkEmployee = await Employee.findOne({email:request.body.email});

        if(!checkEmployee){
            return response.status(400).json({
                message: "Unable to create, try again later"
            });
        }

        await sendMail(request.body.email, newPassword, request.body.email);

        return response.status(200).json({
            message: "Employee Registered",
            employee: {
                firstName: checkEmployee.firstName,
                lastName: checkEmployee.lastName,
                email: checkEmployee.email,
                phone: checkEmployee.phone,
                designation: checkEmployee.designation,
                image: checkEmployee.image,
                employeeId: checkEmployee.employeeId,
                gender: checkEmployee.gender,
                workEmail: checkEmployee.workEmail,
                birthDate: checkEmployee.birthDate,
                maritalStatus: checkEmployee.maritalStatus,
                nationality: checkEmployee.nationality,
                homeAddress: checkEmployee.homeAddress,
                city: checkEmployee.city,
                district: checkEmployee.district,
                zipCode: checkEmployee.zipCode,
                department: checkEmployee.department,
                employeeType: checkEmployee.employeeType,
                contractType: checkEmployee.contractType,
                workingDays: checkEmployee.workingDays,
                hireDate: checkEmployee.hireDate,
                socialAccounts: checkEmployee.socialAccounts,
                bankBranch: checkEmployee.bankBranch,
                bankAccountNumber: checkEmployee.bankAccountNumber,
                accountName: checkEmployee.accountName,
                leaveDaysGiven: checkEmployee.leaveDaysGiven,
                usedLeaveDays: checkEmployee.usedLeaveDays,
                totalDaysLeft: checkEmployee.totalDaysLeft,
            }
        });

    } catch (error:any) {
        console.log(error.message)
        return response.status(500).json({
            message: "Internal Server Error"
        });
    }
}