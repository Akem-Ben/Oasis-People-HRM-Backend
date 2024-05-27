"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployee = void 0;
const hrModel_1 = __importDefault(require("../../models/hrModel/hrModel"));
const helpersFunctions_1 = require("../../utilities/helpersFunctions");
const emailNotification_1 = require("../../utilities/emailNotification");
const validators_1 = require("../../validators/validators");
const employeeModel_1 = __importDefault(require("../../models/employeeModel/employeeModel"));
const createEmployee = async (request, response) => {
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
        const validateInput = await validators_1.registerEmployeeSchema.validateAsync(request.body);
        if (validateInput.error) {
            return response.status(400).json({
                Error: validateInput.error.details[0].message,
            });
        }
        const findAdmin = await hrModel_1.default.findOne({ email: request.body.email });
        if (findAdmin) {
            return response.status(400).json({
                message: "This user exists as a HR",
                findAdmin
            });
        }
        const findEmployee = await employeeModel_1.default.findOne({ email: request.body.email });
        if (findEmployee) {
            return response.status(400).json({
                message: "This employee already exists",
                findEmployee
            });
        }
        const newPassword = (0, helpersFunctions_1.generatePassword)(request.body.lastName);
        const hashedPassword = await (0, helpersFunctions_1.hashPassword)(newPassword);
        const allEmployees = await employeeModel_1.default.find({});
        let lastEmployeeId = "";
        let newEmployeeId = "";
        if (allEmployees.length === 0) {
            newEmployeeId = (0, helpersFunctions_1.generateEmployeeID)(lastEmployeeId);
        }
        else {
            let agentIds = allEmployees.map((employee) => {
                const max_id_number = employee.employeeId.split("-")[2];
                return Number(max_id_number);
            });
            let sortedEmployeeIds = agentIds.sort((id1, id2) => id2 - id1);
            lastEmployeeId = sortedEmployeeIds[0].toString();
            newEmployeeId = (0, helpersFunctions_1.generateEmployeeID)(lastEmployeeId);
        }
        await employeeModel_1.default.create({
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
        const checkEmployee = await employeeModel_1.default.findOne({ email: request.body.email });
        if (!checkEmployee) {
            return response.status(400).json({
                message: "Unable to create, try again later"
            });
        }
        await (0, emailNotification_1.sendMail)(request.body.email, newPassword, request.body.email);
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
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: "Internal Server Error"
        });
    }
};
exports.createEmployee = createEmployee;
