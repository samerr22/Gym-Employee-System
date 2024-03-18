import express from 'express';

import { verifyToken } from '../utils/VerfiyUser.js';
import { absent, attendance, deleteEmp, deleteIAttend, deleteabsent, getEmploye, getabsent, getemployee, signgin,  signup, updateemp } from '../controllers/employe.controller.js';

const router = express.Router();


router.post("/signup/emp", verifyToken,signup);
router.post("/signin/empp", signgin);
router.get('/getEmploye', getemployee);
router.put('/updateEmploye/:EmpId',verifyToken,  updateemp);
router.delete('/deletemp/:EmpId',verifyToken,  deleteEmp);
router.post("/create", attendance);
router.post("/absent", absent);
router.get('/getEmp/:EmployeId', getEmploye);
router.delete('/deletCurretId/:EmployeId',verifyToken,  deleteIAttend)
router.get('/getabsent', getabsent);
router.delete('/deletemp/:AbsentId', verifyToken, deleteabsent);



export default router;