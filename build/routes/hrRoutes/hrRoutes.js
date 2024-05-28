"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createHR_1 = require("../../controllers/hr/createHR");
const loginHr_1 = require("../../controllers/hr/loginHr");
const createEmployee_1 = require("../../controllers/hr/createEmployee");
const cloudinaryUpload_1 = require("../../utilities/cloudinaryUpload");
const authorization_1 = require("../../middlewares/authorization");
const allEmployees_1 = require("../../controllers/hr/allEmployees");
const router = express_1.default.Router();
router.post('/register', createHR_1.adminRegister);
router.post('/login', loginHr_1.login);
router.post('/create-employee', authorization_1.hrAuthoriser, cloudinaryUpload_1.upload.single("image"), createEmployee_1.createEmployee);
router.get('/view-employees', authorization_1.hrAuthoriser, allEmployees_1.viewEmployees);
exports.default = router;
