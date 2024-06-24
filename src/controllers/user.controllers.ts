
import express from 'express';
import {db} from '../db';


const signin = (req: express.Request, res: express.Response) => {
    try {
        const {phoneNumber} = req.params;
        if (!phoneNumber) {
            return res.status(400).json({message: 'Phone number is required'});
        }
        const user = db.user.findUnique({ where: {phone:phoneNumber} });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // TODO : OTP logic
        res.status(200).json({ user });
    } catch (error) {
        if(error instanceof Error)
        res.status(500).json({ message: 'An error occurred while fetching the user', error: error.message });
    }
};
const signup  = (req: express.Request, res: express.Response) => {
    const {email,phoneNumber,name}  = req.body;
    if (!email || !phoneNumber || !name) {
        return res.status(400).json({message: 'Email and Phone number are required'});
    }
   const user = db.user.findFirst({ where: {phone:phoneNumber} }); 
    if(!user){
        db.user.create({
            data: {
                email,
                phone:phoneNumber,
                name
            }
        });
        res.status(201).json({ message: 'User created successfully', user });    
    }
    else{
        res.status(400).json({ message: 'User already exists' });
    }
   
}

export  {signin,signup};