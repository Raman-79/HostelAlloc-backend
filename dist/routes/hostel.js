"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hostel_1 = require("../controllers/hostel");
const router = express_1.default.Router();
router.put('/allocate', hostel_1.allocateHostel);
router.post('/create', hostel_1.createHostel);
router.get('/all', hostel_1.getAllHostels);
exports.default = router;
