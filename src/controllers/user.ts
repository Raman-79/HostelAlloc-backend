import { Request, Response } from 'express';
import { db } from '../db';
import { isServerError } from '../types';


const findUser = async (req: Request, res: Response) => {
    const { name } = req.query;
    const NAME = name as string;
    const [firstName, lastName] = NAME?.split(' ');

    if (!name) {
        return res.status(400).json({ message: 'First name or Last name is required' });
    }

    try {
        const students = await db.aPUC_studentprofile.findMany({
            select: {
                ID: true,
                FirstName: true,
                LastName: true
            },
            where: {
                OR: [
                    {
                        OR: [
                            {FirstName:{ contains: NAME } },
                            { LastName: { contains: NAME } }
                        ]
                    },
                    {
                        AND: [
                            { FirstName: { startsWith: firstName } },
                            { LastName: { contains: lastName } }
                        ]
                    }
                ],
            }
        });

        if (students.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ students });
    } catch (error) {
            if(isServerError(error))
                res.status(500).json({ message: 'An error occurred while fetching the user', error: error.message });
            else 
                res.status(500).json({ message: 'An error occurred while fetching the user' });
    }
};
const createUser = async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) {
        return res.status(400).json({ message: 'First name and Last name are required' });
    }

    try {
        const newUser = await db.aPUC_studentprofile.create({
            data: {
                FirstName: firstName,
                LastName: lastName
            }
        });

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
       /// res.status(500).json({ message: 'An error occurred while creating the user', error: error.message });
    }
};
const getUser = async(  req: Request, res: Response) => {    
    const { id } = req.query;
    const ID = Number(id);
    if (isNaN(ID)) {
        return res.status(400).json({ message: 'ID is required' });
    }
    try {
        const user = await db.aPUC_studentprofile.findUnique({
            where: {
                ID: ID,
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        //res.status(500).json({ message: 'An error occurred while fetching the user', error: error.message });
    }
}

export  { findUser, createUser, getUser};
