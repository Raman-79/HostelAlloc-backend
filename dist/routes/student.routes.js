"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controllers_1 = require("../controllers/student.controllers");
const router = express_1.default.Router();
router.get('/find', student_controllers_1.findUser);
router.get('/user', student_controllers_1.getUser);
router.post('/createUser', student_controllers_1.createUser);
exports.default = router;
