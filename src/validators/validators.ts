import Joi from 'joi';

export const registerEmployeeSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    middleName: Joi.string().required(),
    nextOfKin: Joi.string().required(),
    phone: Joi.string().required(),
    gender: Joi.string().required(),
    birthDate: Joi.date().required(),
    maritalStatus: Joi.string().required(),
    nationality: Joi.string().required(),
    homeAddress: Joi.string().required(),
    city: Joi.string().required(),
    district: Joi.string().required(),
    zipCode: Joi.string().required(),
    department: Joi.string().required(),
    designation: Joi.string().required(),
    employeeType: Joi.string().required(),
    contractType: Joi.string().required(),
    workingDays: Joi.string().required(),
    socialAccounts: Joi.string().required(),
    bankBranch: Joi.string().required(),
    bankAccountNumber: Joi.string().required(),
    accountName: Joi.string().required()
})

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