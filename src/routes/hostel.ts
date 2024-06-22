import express from 'express';
import { getAllHostels,allocateHostel,createHostel } from '../controllers/hostel';
const router = express.Router();

router.put('/allocate',allocateHostel);
router.post('/create',createHostel);
router.get('/all', getAllHostels);


export default router;

