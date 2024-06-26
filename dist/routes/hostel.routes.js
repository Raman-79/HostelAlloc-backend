"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hostel_controllers_1 = require("../controllers/hostel.controllers");
const router = express_1.default.Router();
router.put('/allocate', hostel_controllers_1.allocateHostel);
router.post('/create', hostel_controllers_1.createHostel);
router.get('/all', hostel_controllers_1.getAllHostels);
exports.default = router;
