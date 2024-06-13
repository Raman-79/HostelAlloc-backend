import express from 'express';
import {findUser} from '../controllers/user';

const router = express.Router();

router.get('/:name', findUser);

router.post('/createUser');

export default router;