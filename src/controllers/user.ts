import { Request, Response } from 'express';
import { db } from '../db';

const findUser = async (req: Request, res: Response) => {
    const { name } = req.query;

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
                            { FirstName: { startsWith: name as string } },
                            { LastName: { endsWith: name as string } }
                        ]
                    },
                    {
                        AND: [
                            { FirstName: { startsWith: name as string } },
                            { LastName: { endsWith: name as string } }
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
        //res.status(500).json({ message: 'An error occurred while fetching the user', error: error.message });
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

export  { findUser, createUser };

// TODO: Learn about Pagination and apply 
// TODO : Create hostel/admin signup and login api's