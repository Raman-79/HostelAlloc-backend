import express from 'express';
import {findUser,createUser} from '../controllers/user';

const router = express.Router();

router.get('/find', findUser);

router.post('/createUser',createUser);

export default router;