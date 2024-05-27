import express from 'express';
import { adminRegister } from '../../controllers/hr/createHR';
import { login } from '../../controllers/hr/loginHr';
import { createEmployee } from '../../controllers/hr/createEmployee';
import { upload } from '../../utilities/cloudinaryUpload';
import { hrAuthoriser } from '../../middlewares/authorization';

const router = express.Router();


router.post('/register', adminRegister)
router.post('/login', login)
router.post('/create-employee', hrAuthoriser,  upload.single("image"), createEmployee)

export default router;