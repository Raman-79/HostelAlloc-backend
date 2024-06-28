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
exports.signup = exports.signin = void 0;
const db_1 = require("../db");
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.query;
        const EMAIL = email;
        const PASSWORD = password;
        if (!EMAIL || !PASSWORD) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = yield db_1.db.user.findUnique({
            where: { email: EMAIL, password: PASSWORD }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // You should use a proper password hashing mechanism here, this is just a placeholder
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: 'An error occurred while fetching the user', error: error.message });
    }
});
exports.signin = signin;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, phoneNumber, name } = req.body;
        if (!email || !phoneNumber || !name) {
            return res.status(400).json({ message: 'Email, phone number, and name are required' });
        }
        const existingUser = yield db_1.db.user.findFirst({ where: { phone: phoneNumber } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = yield db_1.db.user.create({
            data: {
                email,
                phone: phoneNumber,
                name,
                password, // Ensure you hash the password before saving it in a production environment
            },
        });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'An error occurred while creating the user', error: error.message });
        }
    }
});
exports.signup = signup;
