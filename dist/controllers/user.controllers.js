"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = exports.signin = void 0;
const db_1 = require("../db");
const signin = (req, res) => {
    try {
        const { phoneNumber } = req.params;
        if (!phoneNumber) {
            return res.status(400).json({ message: 'Phone number is required' });
        }
        const user = db_1.db.user.findUnique({ where: { phone: phoneNumber } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // TODO : OTP logic
        res.status(200).json({ user });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: 'An error occurred while fetching the user', error: error.message });
    }
};
exports.signin = signin;
const signup = (req, res) => {
    const { email, phoneNumber, name } = req.body;
    if (!email || !phoneNumber || !name) {
        return res.status(400).json({ message: 'Email and Phone number are required' });
    }
    const user = db_1.db.user.findFirst({ where: { phone: phoneNumber } });
    if (!user) {
        db_1.db.user.create({
            data: {
                email,
                phone: phoneNumber,
                name
            }
        });
        res.status(201).json({ message: 'User created successfully', user });
    }
    else {
        res.status(400).json({ message: 'User already exists' });
    }
};
exports.signup = signup;
