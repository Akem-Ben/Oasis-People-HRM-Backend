"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerEmployeeSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerEmployeeSchema = joi_1.default.object().keys({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    middleName: joi_1.default.string().required(),
    nextOfKin: joi_1.default.string().required(),
    phone: joi_1.default.string().required(),
    gender: joi_1.default.string().required(),
    birthDate: joi_1.default.date().required(),
    maritalStatus: joi_1.default.string().required(),
    nationality: joi_1.default.string().required(),
    homeAddress: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    district: joi_1.default.string().required(),
    zipCode: joi_1.default.string().required(),
    department: joi_1.default.string().required(),
    designation: joi_1.default.string().required(),
    employeeType: joi_1.default.string().required(),
    contractType: joi_1.default.string().required(),
    workingDays: joi_1.default.string().required(),
    socialAccounts: joi_1.default.string().required(),
    bankBranch: joi_1.default.string().required(),
    bankAccountNumber: joi_1.default.string().required(),
    accountName: joi_1.default.string().required()
});
// export const loginSchema = Joi.object().keys({
//     email: Joi.string().email().required(),
//     password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
//     confirmPassword: .
// label('Confirm Password').messages({"any.only":"{{label}} does not match"}),
// })
// export const roomSchema = Joi.object().keys({
//     roomType: Joi.string().required(),
//     roomNumber: Joi.string().required(),
//     roomPrice: Joi.number().required(),
//     // roomStatus: Joi.string(),
//     // roomImage: Joi.string()
// })
