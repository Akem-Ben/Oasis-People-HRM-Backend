"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewEmployees = void 0;
const employeeModel_1 = __importDefault(require("../../models/employeeModel/employeeModel"));
const viewEmployees = async (request, response) => {
    try {
        const employees = await employeeModel_1.default.find({});
        if (employees.length < 1) {
            return response.status(404).json({
                message: 'No employees available',
                employees
            });
        }
        return response.status(200).json({
            message: 'employees found',
            employees
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).json({
            message: 'Internal Server Error'
        });
    }
};
exports.viewEmployees = viewEmployees;
