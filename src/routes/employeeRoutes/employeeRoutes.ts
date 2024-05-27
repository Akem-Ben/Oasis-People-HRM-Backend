import express from 'express';
import { employeeAuthoriser } from '../../middlewares/authorization';
import { employeeClockIn } from '../../controllers/employees/employeeClockIn';
import { employeeClockout } from '../../controllers/employees/employeeClockout';
import { employeeRequestLeave } from '../../controllers/employees/employeeRequestLeave';

const router = express.Router();

router.post('/clock-in', employeeAuthoriser, employeeClockIn)
router.put('/clock-out/:id', employeeAuthoriser, employeeClockout)
router.post('/request-leave', employeeAuthoriser, employeeRequestLeave)

export default router;