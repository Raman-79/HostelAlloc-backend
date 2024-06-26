"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHostel = exports.allocateHostel = exports.getAllHostels = void 0;
const db_1 = require("../db");
const types_1 = require("../types");
const allocateHostel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, hostelId, wardenName } = req.body;
    const HOSTELID = parseInt(hostelId);
    const StudentID = parseInt(studentId);
    const Warden = wardenName;
    const ReportingTime = new Date();
    if (!studentId || !hostelId) {
        return res.status(400).json({ message: 'Student ID and Hostel ID are required' });
    }
    try {
        const student = yield db_1.db.aPUC_studentprofile.findUnique({
            where: {
                ID: studentId
            }
        });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        const hostel = yield db_1.db.hostel.findUnique({
            where: {
                id: hostelId
            }
        });
        if (!hostel) {
            return res.status(404).json({ message: 'Hostel not found' });
        }
        const allocation = yield db_1.db.aPUC_studentprofile.update({
            where: {
                ID: StudentID
            },
            data: {
                hostelId: HOSTELID,
                WardenName: Warden,
                ReportingDate: ReportingTime
            }
        });
        res.status(201).json({ message: 'Hostel allocated successfully', allocation, ReportingDate: ReportingTime });
    }
    catch (error) {
        if ((0, types_1.isServerError)(error))
            res.status(500).json({ message: 'An error occurred while allocating the hostel', error: error.message });
        else
            res.status(500).json({ message: 'An error occurred while allocating the hostel' });
    }
});
exports.allocateHostel = allocateHostel;
const getAllHostels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hostels = yield db_1.db.hostel.findMany();
        res.status(200).json({ hostels });
    }
    catch (error) {
        if ((0, types_1.isServerError)(error))
            res.status(500).json({ message: 'An error occurred while fetching the hostels', error: error.message });
        else
            res.status(500).json({ message: 'An error occurred while fetching the hostels' });
    }
});
exports.getAllHostels = getAllHostels;
const createHostel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name and capacity are required' });
    }
    try {
        const hostel = yield db_1.db.hostel.create({
            data: {
                name,
            }
        });
        res.status(201).json({ message: 'Hostel created successfully', hostel });
    }
    catch (error) {
        if ((0, types_1.isServerError)(error))
            res.status(500).json({ message: 'An error occurred while creating the hostel', error: error.message });
        else
            res.status(500).json({ message: 'An error occurred while creating the hostel' });
    }
});
exports.createHostel = createHostel;
