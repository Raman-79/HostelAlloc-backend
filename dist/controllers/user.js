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
exports.createUser = exports.findUser = void 0;
const db_1 = require("../db");
const findUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ message: 'First name or Last name is required' });
    }
    try {
        const students = yield db_1.db.aPUC_studentprofile.findMany({
            select: {
                ID: true,
                FirstName: true,
                LastName: true
            },
            where: {
                OR: [
                    {
                        OR: [
                            { FirstName: { startsWith: name } },
                            { LastName: { endsWith: name } }
                        ]
                    },
                    {
                        AND: [
                            { FirstName: { startsWith: name } },
                            { LastName: { endsWith: name } }
                        ]
                    }
                ],
            }
        });
        if (students.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ students });
    }
    catch (error) {
        //res.status(500).json({ message: 'An error occurred while fetching the user', error: error.message });
    }
});
exports.findUser = findUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
        return res.status(400).json({ message: 'First name and Last name are required' });
    }
    try {
        const newUser = yield db_1.db.aPUC_studentprofile.create({
            data: {
                FirstName: firstName,
                LastName: lastName
            }
        });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    }
    catch (error) {
        /// res.status(500).json({ message: 'An error occurred while creating the user', error: error.message });
    }
});
exports.createUser = createUser;
// TODO: Learn about Pagination and apply 
// TODO : Create hostel/admin signup and login api's