import express from 'express';
import {findUser,createUser,getUser} from '../controllers/user';

const router = express.Router();

router.get('/find', findUser);
router.get('/user',getUser);
router.post('/createUser',createUser);


export default router;