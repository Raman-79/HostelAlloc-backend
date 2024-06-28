import express from 'express';
import {db} from '../db';

const signin = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.query;
        const EMAIL = email as string;
        const PASSWORD = password as string;

    if (!EMAIL || !PASSWORD) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await db.user.findUnique({
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
    } catch (error) {
        if(error instanceof Error)
        res.status(500).json({ message: 'An error occurred while fetching the user', error: error.message });
    }
};
const signup  = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, phoneNumber, name } = req.body;
    
        if (!email || !phoneNumber || !name) {
          return res.status(400).json({ message: 'Email, phone number, and name are required' });
        }
    
        const existingUser = await db.user.findFirst({ where: { phone: phoneNumber } });
    
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        const newUser = await db.user.create({
          data: {
            email,
            phone: phoneNumber,
            name,
            password, // Ensure you hash the password before saving it in a production environment
          },
        });
    
        res.status(201).json({ message: 'User created successfully', user: newUser });
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ message: 'An error occurred while creating the user', error: error.message });
        }
      }
}

export  {signin,signup};