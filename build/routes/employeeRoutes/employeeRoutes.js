"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorization_1 = require("../../middlewares/authorization");
const employeeClockIn_1 = require("../../controllers/employees/employeeClockIn");
const employeeClockout_1 = require("../../controllers/employees/employeeClockout");
const employeeRequestLeave_1 = require("../../controllers/employees/employeeRequestLeave");
const router = express_1.default.Router();
router.post('/clock-in', authorization_1.employeeAuthoriser, employeeClockIn_1.employeeClockIn);
router.put('/clock-out/:id', authorization_1.employeeAuthoriser, employeeClockout_1.employeeClockout);
router.post('/request-leave', authorization_1.employeeAuthoriser, employeeRequestLeave_1.employeeRequestLeave);
exports.default = router;
