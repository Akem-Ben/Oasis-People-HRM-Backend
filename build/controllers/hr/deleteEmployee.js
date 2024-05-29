"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = void 0;
const employeeModel_1 = __importDefault(require("../../models/employeeModel/employeeModel"));
const deleteEmployee = async (request, response) => {
    try {
        const id = request.params.id;
        const employee = await employeeModel_1.default.findByIdAndDelete(id);
        if (!employee) {
            return response.status(404).json({
                message: "Employee not found",
            });
        }
        return response.status(200).json({
            message: "Employee deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting employee:", error.message);
        return response.status(500).json({
            message: "Internal Server Error"
        });
    }
};
exports.deleteEmployee = deleteEmployee;
