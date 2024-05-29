import express from 'express';
import { adminRegister } from '../../controllers/hr/createHR';
import { login } from '../../controllers/hr/loginHr';
import { createEmployee } from '../../controllers/hr/createEmployee';
import { upload } from '../../utilities/cloudinaryUpload';
import { hrAuthoriser } from '../../middlewares/authorization';
import { viewEmployees } from '../../controllers/hr/allEmployees';
import { viewSingleEmployeeLeave } from '../../controllers/hr/viewSingleEmployeeLeave';
import { processEmployeeLeave } from '../../controllers/hr/processLeave';
import { viewAllLeaveHistories } from '../../controllers/hr/viewAllLeaveHistories';
import { allAttendanceHistories } from '../../controllers/hr/viewAllAttendance';
import { allEmployeeLeaveRequests } from '../../controllers/hr/viewAllEmployeeLeaveRequests';
import { singleEmployeeAttendanceHistory } from '../../controllers/hr/viewSingleEmployeeAttendanceHistory';
import { viewDailyAttendance } from '../../controllers/hr/getAllDailyAttendance';
import { graphAttendance } from '../../controllers/hr/getGraphAttendance';

const router = express.Router();


router.post('/register', adminRegister)
router.post('/login', login)
router.post('/create-employee', hrAuthoriser,  upload.single("image"), createEmployee)
router.get('/view-employees', hrAuthoriser, viewEmployees)
router.get('/single-leave/:id', hrAuthoriser, viewSingleEmployeeLeave)
router.post('/process-leave/:id', hrAuthoriser, processEmployeeLeave)
router.get('/leave-histories', hrAuthoriser, viewAllLeaveHistories)
router.get('/all-attendance', hrAuthoriser, allAttendanceHistories)
router.get('/all-employee-leave/:id', hrAuthoriser, allEmployeeLeaveRequests)
router.get('/employee-attendance-history/:id', hrAuthoriser, singleEmployeeAttendanceHistory)
router.get('/daily-attendance', hrAuthoriser, viewDailyAttendance)
router.get('/graph-attendance', hrAuthoriser, graphAttendance)













export default router;